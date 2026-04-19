const { kv } = require('@vercel/kv');

const CUPONES_DEFAULT = {
  'LUMIERE10':  { descuento: 10, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 100 },
  'BIENVENIDA': { descuento: 15, tipo: 'porcentaje', vence: '2026-12-31', usos_max: 50  },
  'FLASH20':    { descuento: 20, tipo: 'porcentaje', vence: '2026-06-30', usos_max: 30  },
  'FIJO50':     { descuento: 50, tipo: 'fijo',       vence: '2026-12-31', usos_max: 200 }
};

const ADMIN_KEY = process.env.ADMIN_KEY || 'chata2026';

async function getCupones() {
  const kvCupones = await kv.get('lumiere_cupones');
  return kvCupones || { ...CUPONES_DEFAULT };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    if (req.query.key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });

    const cupones = await getCupones();
    const codigos = Object.keys(cupones);

    const [usos, maxOverrides] = await Promise.all([
      Promise.all(codigos.map(c => kv.get('cupon_usos:' + c))),
      Promise.all(codigos.map(c => kv.get('cupon_max:' + c)))
    ]);

    const resultado = codigos.map((codigo, i) => ({
      codigo,
      ...cupones[codigo],
      usos_max: maxOverrides[i] !== null ? maxOverrides[i] : cupones[codigo].usos_max,
      usos_actuales: usos[i] || 0
    }));

    return res.status(200).json(resultado);
  }

  if (req.method === 'POST') {
    const { key, action, codigo, cupon } = req.body;
    if (key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });

    const cod = codigo ? codigo.trim().toUpperCase() : null;
    const cupones = await getCupones();

    if (action === 'add' || action === 'edit') {
      if (!cod || !cupon || !cupon.descuento || !cupon.tipo || !cupon.vence || !cupon.usos_max) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      cupones[cod] = {
        descuento: Number(cupon.descuento),
        tipo: cupon.tipo,
        vence: cupon.vence,
        usos_max: Number(cupon.usos_max)
      };
      await kv.set('lumiere_cupones', cupones);
      return res.status(200).json({ ok: true });
    }

    if (action === 'delete') {
      if (!cod) return res.status(400).json({ error: 'Código requerido' });
      if (!cupones[cod]) return res.status(404).json({ error: 'Cupón no encontrado' });
      delete cupones[cod];
      await kv.set('lumiere_cupones', cupones);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Acción inválida' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
};
