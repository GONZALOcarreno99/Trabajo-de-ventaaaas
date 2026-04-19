'use strict';

const PAGO_CONFIG = {
  apiUrl:  'https://trabajo-de-ventaaaas.vercel.app',
  sandbox: false,
  culqiPublicKey: 'pk_test_5ST97mBYLxYfKixv'
};

const EMAILJS_CONFIG = {
  serviceId:        'service_7hndzak',
  templateVendedor: 'template_k0b7pmk',
  templateCliente:  'template_vwxpas8',
  publicKey:        'JdAWNFie8EyYVSIeH'
};

const WA_NUMERO = '51924213531';

// ============================================
// NOTIFICACIÓN COMPRA RECIENTE
// ============================================

const NOMBRES = ['Valentina','Sofía','Camila','María','Lucía','Isabella','Daniela','Fernanda','Gabriela','Alessandra','Natalia','Valeria','Andrea','Paola','Karla'];
const CIUDADES = ['Lima','Miraflores','San Isidro','Arequipa','Cusco','Trujillo','Piura','Chiclayo','Ica','Tacna','Huancayo','Cajamarca','Iquitos','Puno'];
const PRODUCTOS_NOTIF = ['Sérum Nebula','Palette Aurora','Cosmos Noir Cream','Gold Collagen Mask','Eye Matrix','Retinol Night Force','Elixir Noir Perfume','Hydra Boost Cream'];

function mostrarNotificacionCompra() {
  const nombre  = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
  const ciudad  = CIUDADES[Math.floor(Math.random() * CIUDADES.length)];
  const producto = PRODUCTOS_NOTIF[Math.floor(Math.random() * PRODUCTOS_NOTIF.length)];
  const minutos = Math.floor(Math.random() * 8) + 1;

  const notif = document.createElement('div');
  notif.id = 'compraNotif';
  notif.style.cssText = `
    position: fixed; bottom: 24px; left: 24px; z-index: 400;
    background: rgba(10,10,20,0.97); border: 1px solid rgba(180,95,255,0.3);
    border-radius: 8px; padding: 14px 18px; display: flex; align-items: center;
    gap: 12px; max-width: 300px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    transform: translateX(-150%); transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
  `;

  notif.innerHTML = `
    <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#b45fff,#ff3fa4);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;">💄</div>
    <div>
      <div style="font-size:13px;font-weight:600;color:#f0eeff;font-family:'Rajdhani',sans-serif;">${nombre} de ${ciudad}</div>
      <div style="font-size:12px;color:rgba(240,238,255,0.6);font-family:'Rajdhani',sans-serif;">compró <span style="color:#b45fff;">${producto}</span></div>
      <div style="font-size:11px;color:rgba(240,238,255,0.35);margin-top:2px;font-family:'Rajdhani',sans-serif;">hace ${minutos} min</div>
    </div>
    <button onclick="this.parentElement.remove()" style="position:absolute;top:6px;right:8px;background:none;border:none;color:rgba(240,238,255,0.3);cursor:pointer;font-size:14px;">✕</button>
  `;

  document.body.appendChild(notif);
  setTimeout(() => { notif.style.transform = 'translateX(0)'; }, 100);
  setTimeout(() => {
    notif.style.transform = 'translateX(-150%)';
    setTimeout(() => notif.remove(), 500);
  }, 5000);
}

function iniciarNotificaciones() {
  setTimeout(mostrarNotificacionCompra, 4000);
  setInterval(mostrarNotificacionCompra, 18000);
}

// ============================================
// POPUP DE SALIDA
// ============================================

let popupMostrado = false;

function iniciarPopupSalida() {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !popupMostrado) {
      popupMostrado = true;
      mostrarPopupSalida();
    }
  });
}

function mostrarPopupSalida() {
  const overlay = document.createElement('div');
  overlay.id = 'popupSalida';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 600;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeInPopup 0.3s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes fadeInPopup { from { opacity:0; } to { opacity:1; } }
      @keyframes slideUpPopup { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }
    </style>
    <div style="
      background: #0a0a14; border: 1px solid rgba(180,95,255,0.4);
      border-radius: 8px; padding: 48px 40px; text-align: center;
      max-width: 420px; width: 100%; position: relative;
      animation: slideUpPopup 0.4s ease;
    ">
      <button onclick="cerrarPopupSalida()" style="
        position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.06);
        border:1px solid var(--glass-border);width:32px;height:32px;border-radius:50%;
        color:#fff;font-size:16px;cursor:pointer;
      ">✕</button>

      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#b45fff,#ff3fa4);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:28px;">🎁</div>

      <div style="font-size:11px;letter-spacing:4px;color:#b45fff;text-transform:uppercase;margin-bottom:10px;font-family:'Rajdhani',sans-serif;">Oferta exclusiva</div>

      <h2 style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:#f0eeff;margin-bottom:12px;">¡No te vayas aún!</h2>

      <p style="color:rgba(240,238,255,0.55);font-size:15px;line-height:1.6;margin-bottom:24px;font-family:'Rajdhani',sans-serif;">
        Llévate un <strong style="color:#ff3fa4;font-size:18px;">10% de descuento</strong> en tu primera compra. Solo por hoy.
      </p>

      <div style="background:rgba(180,95,255,0.08);border:1px dashed rgba(180,95,255,0.4);border-radius:4px;padding:14px;margin-bottom:24px;">
        <div style="font-size:11px;color:rgba(240,238,255,0.4);margin-bottom:6px;font-family:'Rajdhani',sans-serif;letter-spacing:2px;">TU CÓDIGO DE DESCUENTO</div>
        <div style="font-family:monospace;font-size:22px;color:#b45fff;letter-spacing:6px;font-weight:700;">LUMIERE10</div>
      </div>

      <button onclick="cerrarPopupSalida()" style="
        width:100%;background:linear-gradient(135deg,#b45fff,#ff3fa4);border:none;
        padding:18px;border-radius:4px;color:#fff;font-family:'Rajdhani',sans-serif;
        font-size:14px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;margin-bottom:12px;
      ">Seguir comprando →</button>

      <div style="font-size:12px;color:rgba(240,238,255,0.25);cursor:pointer;font-family:'Rajdhani',sans-serif;" onclick="cerrarPopupSalida()">
        No gracias, prefiero pagar precio completo
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrarPopupSalida(); });
  document.body.appendChild(overlay);
}

function cerrarPopupSalida() {
  const popup = document.getElementById('popupSalida');
  if (popup) popup.remove();
}

// ============================================
// EMAILJS
// ============================================

async function cargarEmailJS() {
  if (typeof emailjs !== 'undefined') return;
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = resolve; script.onerror = reject;
    document.head.appendChild(script);
  });
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

async function enviarEmails(pedido) {
  try {
    await cargarEmailJS();
    const productos = pedido.productos.map(p => p.nombre + ' x' + p.qty + ' — S/ ' + (p.precio * p.qty)).join(', ');
    const params = {
      pedido_id: pedido.id, cliente: pedido.cliente, whatsapp: pedido.whatsapp,
      email_cliente: pedido.email, direccion: pedido.direccion, turno: pedido.turno,
      productos: productos, total: pedido.total.toLocaleString(), fecha: pedido.fecha
    };
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateVendedor, params);
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateCliente, params);
    console.log('Emails enviados');
  } catch (err) {
    console.error('Error emails:', err);
  }
}

// ============================================
// INICIAR PAGO
// ============================================

async function iniciarPagoMP(cart, formData, cupon, descuentoYaCalculado) {
  if (window._pagoProcesando) return;
  window._pagoProcesando = true;

  const btn = document.getElementById('submitBtn');
  const txt = document.getElementById('submitText');
  const errorDiv = document.getElementById('pagoError');

  if (errorDiv) errorDiv.style.display = 'none';
  btn.disabled = true;
  txt.textContent = 'Cargando pago...';

  const subtotal = cart.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);
  const descuento = Number(descuentoYaCalculado) || 0;
  const total = Math.round((subtotal - descuento) * 100) / 100;

  if (!total || total <= 0) {
    if (errorDiv) { errorDiv.textContent = '⚠️ Error en el carrito. Recarga la página e intenta de nuevo.'; errorDiv.style.display = 'block'; }
    btn.disabled = false;
    txt.textContent = 'Pagar con tarjeta →';
    window._pagoProcesando = false;
    return;
  }

  console.log('iniciarPago:', { subtotal, descuento, total, amountCentavos: Math.round(total*100) });

  // Guardar datos para usar en el callback global de Culqi
  window._culqiData = { cart, formData, cupon, descuento, total, btn, txt, errorDiv };

  // Configurar Culqi v4
  Culqi.publicKey = PAGO_CONFIG.culqiPublicKey;
  Culqi.settings({
    title:       'LUMIÈRE',
    currency:    'PEN',
    description: 'Compra en LUMIÈRE',
    amount:      Math.round(total * 100)
  });
  Culqi.open();

  btn.disabled = false;
  txt.textContent = 'Pagar con tarjeta →';
  window._pagoProcesando = false;
}

// Función global que Culqi llama cuando genera el token

// ============================================
// GRACIAS.HTML — leer estado del pago
// ============================================

function leerEstadoPago() {
  const params   = new URLSearchParams(window.location.search);
  const status   = params.get('status');
  const pedido   = JSON.parse(localStorage.getItem('lumiere_ultimo_pedido') || 'null');
  const statusEl = document.getElementById('pagoStatus');
  if (!statusEl) return;

  if (status === 'approved' && pedido) enviarEmails(pedido);

  const estados = {
    approved: { icon: '✓', title: '¡Pago aprobado!',  msg: 'Tu pago fue procesado correctamente. Te contactaremos por WhatsApp para coordinar la entrega.', color: '#22c55e' },
    pending:  { icon: '⏳', title: 'Pago pendiente',   msg: 'Tu pago está siendo procesado. Te avisaremos cuando se confirme.',                               color: '#f59e0b' },
    rejected: { icon: '✕', title: 'Pago rechazado',   msg: 'Tu pago no pudo procesarse. Puedes intentar con otra tarjeta o contactarnos por WhatsApp.',       color: '#ef4444' }
  };

  const estado = estados[status] || { icon: '?', title: 'Estado desconocido', msg: 'Contáctanos por WhatsApp.', color: 'var(--text-muted)' };

  const waMsg = pedido ? encodeURIComponent(
    '*NUEVO PEDIDO - LUMIERE*\n' +
    '-----------------------------\n' +
    'Pedido: ' + pedido.id + '\n' +
    'Fecha: ' + pedido.fecha + '\n' +
    '-----------------------------\n' +
    'Cliente: ' + pedido.cliente + '\n' +
    'WhatsApp: ' + pedido.whatsapp + '\n' +
    'Email: ' + pedido.email + '\n' +
    '-----------------------------\n' +
    'Direccion: ' + pedido.direccion + '\n' +
    'Turno: ' + pedido.turno + '\n' +
    (pedido.cupon ? 'Cupon: ' + pedido.cupon + ' (- S/ ' + pedido.descuento + ')\n' : '') +
    '-----------------------------\n' +
    'Productos:\n' + pedido.productos.map(p => '  - ' + p.nombre + ' x' + p.qty + ' = S/ ' + (p.precio * p.qty)).join('\n') + '\n' +
    '-----------------------------\n' +
    '*TOTAL: S/ ' + pedido.total.toLocaleString() + '*'
  ) : '';

  statusEl.innerHTML = `
    <div style="width:72px;height:72px;border-radius:50%;background:rgba(180,95,255,.15);border:1px solid rgba(180,95,255,.3);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 24px;color:${estado.color};">${estado.icon}</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;margin-bottom:12px;">${estado.title}</h2>
    <p style="color:var(--text-muted);font-size:15px;line-height:1.7;margin-bottom:32px;">${estado.msg}</p>
    ${pedido ? `
    <div style="background:rgba(180,95,255,.06);border:1px solid rgba(180,95,255,.15);border-radius:12px;padding:20px;text-align:left;margin-bottom:32px;">
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">Pedido</span><span style="color:var(--neon-purple);">${pedido.id}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">Cliente</span><span>${pedido.cliente}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">WhatsApp</span><span>${pedido.whatsapp}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">Dirección</span><span style="text-align:right;max-width:60%;">${pedido.direccion}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">Turno</span><span>${pedido.turno}</span></div>
      ${pedido.productos && pedido.productos.length ? `
      <div style="padding:12px 0 4px;border-bottom:1px solid rgba(255,255,255,.05);">
        <div style="color:var(--text-muted);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Productos</div>
        ${pedido.productos.map(p => `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;"><span>${p.nombre} x${p.qty}</span><span>S/ ${(p.precio * p.qty).toLocaleString()}</span></div>`).join('')}
      </div>` : ''}
      ${pedido.descuento > 0 ? `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:14px;"><span style="color:var(--text-muted);">Descuento${pedido.cupon ? ' (' + pedido.cupon + ')' : ''}</span><span style="color:#22c55e;">− S/ ${pedido.descuento.toLocaleString()}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:18px;font-weight:600;"><span style="color:var(--text-muted);">Total pagado</span><span style="color:var(--neon-purple);">S/ ${pedido.total.toLocaleString()}</span></div>
    </div>` : ''}
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <button class="btn-primary" onclick="window.location.href='index.html'">Seguir comprando</button>
      ${status === 'approved' && pedido ? `<a href="https://wa.me/${WA_NUMERO}?text=${waMsg}" target="_blank" style="background:linear-gradient(135deg,#25d366,#128c7e);border:none;padding:16px 32px;border-radius:2px;color:#fff;font-family:'Rajdhani',sans-serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">📱 Ver pedido en WhatsApp</a>` : ''}
      ${status === 'rejected' ? `<button class="btn-secondary" onclick="window.location.href='checkout.html'">Intentar de nuevo</button>` : ''}
    </div>
  `;
}

if (document.getElementById('pagoStatus')) {
  document.addEventListener('DOMContentLoaded', leerEstadoPago);
}

// Activar notificaciones y popup en index.html
if (document.getElementById('productsGrid')) {
  document.addEventListener('DOMContentLoaded', () => {
    iniciarNotificaciones();
    iniciarPopupSalida();
  });
}
