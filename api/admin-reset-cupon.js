const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const adminKey = process.env.ADMIN_KEY || 'chata2026';
  const { key, codigo } = req.body;

  if (key !== adminKey) return res.status(401).json({ error: 'No autorizado' });
  if (!codigo) return res.status(400).json({ error: 'Falta el código de cupón' });

  await kv.set('cupon_usos:' + codigo.toUpperCase(), 0);

  return res.status(200).json({ ok: true, mensaje: 'Cupón ' + codigo + ' reseteado a 0 usos' });
};
