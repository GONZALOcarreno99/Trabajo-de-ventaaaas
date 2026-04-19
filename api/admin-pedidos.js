const { kv } = require('@vercel/kv');

const ADMIN_KEY = process.env.ADMIN_KEY || 'chata2026';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    if (req.query.key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });
    const pedidos = await kv.get('lumiere_pedidos') || [];
    return res.status(200).json(pedidos);
  }

  if (req.method === 'POST') {
    const { key, action, pedidoId, estado } = req.body;
    if (key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });

    if (action === 'update-estado') {
      if (!pedidoId || !estado) return res.status(400).json({ error: 'Datos inválidos' });
      const pedidos = await kv.get('lumiere_pedidos') || [];
      const updated = pedidos.map(p => p.id === pedidoId ? { ...p, estado } : p);
      await kv.set('lumiere_pedidos', updated);
      return res.status(200).json({ ok: true });
    }

    if (action === 'delete') {
      if (!pedidoId) return res.status(400).json({ error: 'ID requerido' });
      const pedidos = await kv.get('lumiere_pedidos') || [];
      await kv.set('lumiere_pedidos', pedidos.filter(p => p.id !== pedidoId));
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Acción inválida' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
};
