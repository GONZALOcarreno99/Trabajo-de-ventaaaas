const { kv } = require('@vercel/kv');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_KEY  = process.env.ADMIN_KEY  || 'chata2026';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { user, key, action, producto, id, productos: productosArray } = req.body;
  if (user !== ADMIN_USER || key !== ADMIN_KEY) return res.status(401).json({ error: 'No autorizado' });

  let productos = await kv.get('lumiere_productos') || [];

  if (action === 'add') {
    const newProduct = { ...producto, id: Date.now(), imgs: [producto.img || 'productos/creap.jpg'] };
    delete newProduct.img;
    productos.push(newProduct);
    await kv.set('lumiere_productos', productos);
    return res.status(200).json({ ok: true, id: newProduct.id });
  }

  if (action === 'edit') {
    productos = productos.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, ...producto, id: p.id, imgs: [producto.img || (p.imgs && p.imgs[0]) || 'productos/creap.jpg'] };
      delete updated.img;
      return updated;
    });
    await kv.set('lumiere_productos', productos);
    return res.status(200).json({ ok: true });
  }

  if (action === 'delete') {
    productos = productos.filter(p => p.id !== id);
    await kv.set('lumiere_productos', productos);
    return res.status(200).json({ ok: true });
  }

  if (action === 'sync') {
    await kv.set('lumiere_productos', productosArray);
    return res.status(200).json({ ok: true });
  }

  // ===== RESEÑAS =====
  if (action === 'get-resenas') {
    const resenas = await kv.get('lumiere_resenas') || [];
    return res.status(200).json(resenas);
  }

  if (action === 'add-resena') {
    const { resena } = req.body;
    if (!resena || !resena.nombre || !resena.comentario) return res.status(400).json({ error: 'Datos incompletos' });
    const resenas = await kv.get('lumiere_resenas') || [];
    const nueva = { ...resena, id: Date.now(), fecha: new Date().toISOString(), aprobada: true };
    resenas.unshift(nueva);
    await kv.set('lumiere_resenas', resenas);
    return res.status(200).json({ ok: true, id: nueva.id });
  }

  if (action === 'aprobar-resena') {
    const { resenaId, aprobada } = req.body;
    const resenas = (await kv.get('lumiere_resenas') || []).map(r => r.id === resenaId ? { ...r, aprobada } : r);
    await kv.set('lumiere_resenas', resenas);
    return res.status(200).json({ ok: true });
  }

  if (action === 'delete-resena') {
    const { resenaId } = req.body;
    const resenas = (await kv.get('lumiere_resenas') || []).filter(r => r.id !== resenaId);
    await kv.set('lumiere_resenas', resenas);
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: 'Acción inválida' });
};
