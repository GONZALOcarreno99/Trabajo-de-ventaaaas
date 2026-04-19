const { kv } = require('@vercel/kv');

const CUPONES_DEFAULT = {
  'LUMIERE10':  { descuento: 10, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 100 },
  'BIENVENIDA': { descuento: 15, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 50  },
  'FLASH20':    { descuento: 20, tipo: 'porcentaje', vence: '2026-06-30', usos_max: 30  },
  'FIJO50':     { descuento: 50, tipo: 'fijo',       vence: '2026-12-31', usos_max: 200 }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { cupon, subtotal } = req.body;
  if (!cupon) return res.status(400).json({ error: 'Ingresa un código de cupón' });

  const codigo = cupon.trim().toUpperCase();

  const kvCupones = await kv.get('lumiere_cupones');
  const CUPONES = kvCupones || CUPONES_DEFAULT;

  const datos = CUPONES[codigo];
  if (!datos) return res.status(400).json({ error: 'Cupón inválido o inexistente.' });

  const hoy   = new Date();
  const vence = new Date(datos.vence);
  if (hoy > vence) return res.status(400).json({ error: 'Este cupón ya expiró.' });

  const [usos, maxOverride] = await Promise.all([
    kv.get('cupon_usos:' + codigo),
    kv.get('cupon_max:' + codigo)
  ]);

  const usosActuales = usos || 0;
  const usosMax      = maxOverride !== null ? maxOverride : datos.usos_max;

  if (usosActuales >= usosMax) {
    return res.status(400).json({ error: 'Este cupón ya alcanzó su límite de usos.' });
  }

  let descuentoAplicado = 0;
  if (datos.tipo === 'porcentaje') {
    descuentoAplicado = Math.round(subtotal * datos.descuento / 100 * 100) / 100;
  } else {
    descuentoAplicado = Math.min(datos.descuento, subtotal);
  }

  return res.status(200).json({
    cupon: { codigo, descuento: datos.descuento, tipo: datos.tipo },
    descuento_aplicado: descuentoAplicado
  });
};
