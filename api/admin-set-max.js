const { kv } = require('@vercel/kv');

const ADMIN_KEY = process.env.ADMIN_KEY || 'chata2026';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { key, codigo, max } = req.body;
  if (key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });
  if (!codigo || max === undefined || max < 0) return res.status(400).json({ error: 'Datos inválidos' });

  await kv.set('cupon_max:' + codigo.toUpperCase(), Number(max));
  return res.status(200).json({ ok: true });
};
