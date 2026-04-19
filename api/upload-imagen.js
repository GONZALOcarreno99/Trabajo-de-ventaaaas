const { put } = require('@vercel/blob');

module.exports.config = { api: { bodyParser: false } };

const ADMIN_KEY = process.env.ADMIN_KEY || 'chata2026';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key, x-filename');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });

  const filename = req.headers['x-filename'] || ('producto-' + Date.now());

  try {
    const blob = await put('productos/' + filename, req, {
      access: 'public',
      contentType: req.headers['content-type']
    });
    return res.status(200).json({ url: blob.url });
  } catch (e) {
    return res.status(500).json({ error: 'Error al subir imagen: ' + e.message });
  }
};
