const { MercadoPagoConfig, Preference } = require('mercadopago');
const { kv } = require('@vercel/kv');

const CUPONES_DEFAULT = {
  'LUMIERE10':  { descuento: 10, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 100 },
  'BIENVENIDA': { descuento: 15, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 50  },
  'FLASH20':    { descuento: 20, tipo: 'porcentaje', vence: '2026-06-30', usos_max: 30  },
  'FIJO50':     { descuento: 50, tipo: 'fijo',       vence: '2026-12-31', usos_max: 200 }
};

async function getCupones() {
  const kv_cupones = await kv.get('lumiere_cupones');
  return kv_cupones || CUPONES_DEFAULT;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'El servidor no tiene configurado el token de Mercado Pago.' });
  }

  try {
    const { items, payer, back_urls, cupon } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    let descuentoAplicado = 0;
    let cuponInfo = null;

    if (cupon && cupon.trim() !== '') {
      const codigo = cupon.trim().toUpperCase();
      const CUPONES = await getCupones();
      const datos = CUPONES[codigo];

      if (!datos) return res.status(400).json({ error: 'Cupón inválido o inexistente.' });

      const hoy = new Date(); const vence = new Date(datos.vence);
      if (hoy > vence) return res.status(400).json({ error: 'Este cupón ya expiró.' });

      const [usos, maxOverride] = await Promise.all([
        kv.get('cupon_usos:' + codigo),
        kv.get('cupon_max:' + codigo)
      ]);

      const usosActuales = usos || 0;
      const usosMax = maxOverride !== null ? maxOverride : datos.usos_max;

      if (usosActuales >= usosMax) {
        return res.status(400).json({ error: 'Este cupón ya alcanzó su límite de usos.' });
      }

      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      if (datos.tipo === 'porcentaje') {
        descuentoAplicado = Math.round(subtotal * datos.descuento / 100 * 100) / 100;
      } else {
        descuentoAplicado = Math.min(datos.descuento, subtotal);
      }

      cuponInfo = { codigo, descuento: datos.descuento, tipo: datos.tipo, descuentoAplicado };
    }

    let itemsFinales = items.map(item => ({
      id:          String(item.id),
      title:       item.name,
      quantity:    Number(item.qty),
      unit_price:  Number(item.price),
      currency_id: 'PEN'
    }));

    if (descuentoAplicado > 0) {
      itemsFinales.push({
        id:          'DESCUENTO',
        title:       'Descuento cupon ' + cuponInfo.codigo,
        quantity:    1,
        unit_price:  -descuentoAplicado,
        currency_id: 'PEN'
      });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: itemsFinales,
        back_urls: {
          success: back_urls.success,
          failure: back_urls.failure,
          pending: back_urls.pending
        },
        auto_return: 'approved',
        statement_descriptor: 'LUMIERE',
        payment_methods: {
          excluded_payment_types: [],
          installments: 1
        },
        metadata: {
          direccion:    payer.direccion,
          distrito:     payer.distrito,
          departamento: payer.departamento,
          turno:        payer.turno,
          referencia:   payer.referencia,
          nota:         payer.nota || '',
          cupon:        cuponInfo ? cuponInfo.codigo : 'ninguno',
          descuento:    descuentoAplicado
        }
      }
    });

    if (cuponInfo) {
      await kv.incr('cupon_usos:' + cuponInfo.codigo);
    }

    // Guardar pedido en KV
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const pedido = {
      id:               'LUM-' + Date.now(),
      mp_preference_id: result.id,
      fecha:            new Date().toISOString(),
      estado:           'pendiente',
      cliente: {
        nombre:       payer.nombre,
        email:        payer.email,
        whatsapp:     payer.whatsapp,
        direccion:    payer.direccion,
        distrito:     payer.distrito,
        departamento: payer.departamento,
        turno:        payer.turno,
        nota:         payer.nota || ''
      },
      items:     items.map(i => ({ id: i.id, name: i.name, qty: Number(i.qty), price: Number(i.price) })),
      subtotal,
      descuento: descuentoAplicado,
      total:     subtotal - descuentoAplicado,
      cupon:     cuponInfo ? cuponInfo.codigo : null
    };

    const pedidos = await kv.get('lumiere_pedidos') || [];
    pedidos.unshift(pedido);
    await kv.set('lumiere_pedidos', pedidos);

    return res.status(200).json({
      id:                 result.id,
      init_point:         result.init_point,
      sandbox_url:        result.sandbox_init_point,
      descuento_aplicado: descuentoAplicado,
      cupon:              cuponInfo
    });

  } catch (err) {
    console.error('Error Mercado Pago:', err);
    return res.status(500).json({ error: err.message || 'Error interno al crear la preferencia de pago' });
  }
};
