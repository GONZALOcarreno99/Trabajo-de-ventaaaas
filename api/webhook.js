const { kv } = require('@vercel/kv');

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { type, data } = req.body;

    if (type !== 'payment') return res.status(200).json({ received: true });

    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
      headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
    });

    const payment = await paymentRes.json();

    console.log('Pago recibido:', {
      id:       payment.id,
      status:   payment.status,
      amount:   payment.transaction_amount,
      payer:    payment.payer?.email
    });

    if (payment.status === 'approved') {
      const pedidos = await kv.get('lumiere_pedidos') || [];
      const updated = pedidos.map(p =>
        p.mp_preference_id === payment.preference_id ? { ...p, estado: 'aprobado' } : p
      );
      await kv.set('lumiere_pedidos', updated);
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).end();
  }
};
