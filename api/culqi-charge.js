const https = require('https');
const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { token, amount, email, payer, items, cupon, descuento } = req.body;

  if (!token || !email || !items || !items.length) {
    return res.status(400).json({ error: 'Faltan datos del pago' });
  }

  // Verificar precios server-side desde KV
  const productosKV = await kv.get('lumiere_productos');
  let verifiedItems = items;
  if (productosKV && productosKV.length > 0) {
    verifiedItems = items.map(item => {
      const p = productosKV.find(p => String(p.id) === String(item.id));
      return p ? { ...item, price: p.price } : item;
    });
  }

  // Aritmética entera en centavos para evitar errores de punto flotante
  const subtotalCentavos = verifiedItems.reduce((s, i) => s + Math.round(Number(i.price) * 100) * Number(i.qty), 0);
  const descuentoCentavos = Math.min(Math.round((Number(descuento) || 0) * 100), subtotalCentavos);
  const totalCentavos = subtotalCentavos - descuentoCentavos;

  // Usar el monto enviado desde el frontend (es el mismo que se pasó a Culqi.settings)
  // Validar que sea razonable: >= 100 centavos y no mayor que el subtotal completo
  const amountCentavos = Math.round(Number(amount) || 0);
  if (!amountCentavos || amountCentavos < 100) {
    return res.status(400).json({ error: 'Monto inválido. El monto mínimo es S/ 1.00.' });
  }
  if (amountCentavos > subtotalCentavos) {
    return res.status(400).json({ error: 'Monto inválido. Recarga la página e intenta de nuevo.' });
  }
  // Tolerancia de 1 centavo por redondeo
  if (Math.abs(amountCentavos - totalCentavos) > 1) {
    return res.status(400).json({ error: 'El monto no coincide con el carrito. Recarga la página e intenta de nuevo.' });
  }

  // Verificar stock disponible antes de cobrar
  if (productosKV && productosKV.length > 0) {
    for (const item of verifiedItems) {
      const p = productosKV.find(p => p.id === item.id);
      if (p) {
        const disponible = p.stock !== undefined ? p.stock : 99;
        if (disponible < Number(item.qty)) {
          return res.status(400).json({ error: `Lo sentimos, "${item.name}" solo tiene ${disponible} unidad(es) disponible(s). Actualiza tu carrito.` });
        }
      }
    }
  }

  // Re-validar cupón si se aplicó uno
  if (cupon && descuentoNum > 0) {
    const CUPONES_DEFAULT = {
      'LUMIERE10':  { descuento: 10, tipo: 'porcentaje', vence: '2026-12-31' },
      'BIENVENIDA': { descuento: 15, tipo: 'porcentaje', vence: '2026-12-31' },
      'FLASH20':    { descuento: 20, tipo: 'porcentaje', vence: '2026-06-30' },
      'FIJO50':     { descuento: 50, tipo: 'fijo',       vence: '2026-12-31' }
    };
    const kvCupones = await kv.get('lumiere_cupones');
    const CUPONES   = kvCupones || CUPONES_DEFAULT;
    const datosCupon = CUPONES[cupon.toUpperCase()];
    if (!datosCupon || new Date() > new Date(datosCupon.vence)) {
      return res.status(400).json({ error: 'El cupón ya no es válido. Recarga la página e intenta sin cupón.' });
    }
  }

  const chargeData = JSON.stringify({
    amount: amountCentavos, // Culqi usa centavos
    currency_code: 'PEN',
    email,
    source_id: token,
    description: 'Compra LUMIÈRE',
    metadata: {
      nombre:       payer.nombre,
      whatsapp:     payer.whatsapp,
      direccion:    payer.direccion,
      distrito:     payer.distrito,
      departamento: payer.departamento,
      turno:        payer.turno
    }
  });

  try {
    const charge = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.culqi.com',
        path: '/v2/charges',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.CULQI_SECRET_KEY,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(chargeData)
        }
      };

      const request = https.request(options, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          try { resolve({ status: response.statusCode, body: JSON.parse(data) }); }
          catch { reject(new Error('Respuesta inválida de Culqi')); }
        });
      });

      request.on('error', reject);
      request.write(chargeData);
      request.end();
    });

    if (charge.status !== 201 || charge.body.object !== 'charge') {
      console.error('Culqi charge rejected:', JSON.stringify(charge.body));
      return res.status(400).json({
        error: charge.body.user_message || charge.body.merchant_message || 'Error al procesar el pago',
        debug: charge.body
      });
    }

    // Guardar pedido en KV con precios verificados
    const pedido = {
      id:        'LUM-' + Date.now(),
      culqi_id:  charge.body.id,
      fecha:     new Date().toISOString(),
      estado:    'aprobado',
      cliente: {
        nombre:       payer.nombre,
        email,
        whatsapp:     payer.whatsapp,
        direccion:    payer.direccion,
        distrito:     payer.distrito,
        departamento: payer.departamento,
        turno:        payer.turno,
        nota:         payer.nota || ''
      },
      items:     verifiedItems.map(i => ({ id: i.id, name: i.name, qty: Number(i.qty), price: Number(i.price) })),
      subtotal:  subtotalCentavos / 100,
      descuento: descuentoCentavos / 100,
      total:     amountCentavos / 100,
      cupon:     cupon || null
    };

    const pedidos = await kv.get('lumiere_pedidos') || [];
    pedidos.unshift(pedido);
    await kv.set('lumiere_pedidos', pedidos);

    // Decrementar stock
    if (productosKV && productosKV.length > 0) {
      const productosActualizados = productosKV.map(p => {
        const ordered = verifiedItems.find(i => i.id === p.id);
        if (!ordered) return p;
        return { ...p, stock: Math.max(0, (p.stock !== undefined ? p.stock : 99) - Number(ordered.qty)) };
      });
      await kv.set('lumiere_productos', productosActualizados);
    }

    return res.status(200).json({ ok: true, pedidoId: pedido.id });

  } catch (err) {
    console.error('Culqi error:', err);
    return res.status(500).json({ error: 'Error interno al procesar el pago' });
  }
};
