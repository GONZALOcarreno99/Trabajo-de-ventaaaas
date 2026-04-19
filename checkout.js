'use strict';

let cart = [];
let cuponAplicado = null;
let descuentoMonto = 0;

function loadCart() {
  try { cart = JSON.parse(localStorage.getItem('lumiere_cart')) || []; }
  catch { cart = []; }
}

function saveCart() {
  localStorage.setItem('lumiere_cart', JSON.stringify(cart));
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderOrderSummary();
}

function getSubtotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getTotal() {
  return Math.max(0, getSubtotal() - descuentoMonto);
}

// ============================================
// CUPÓN
// ============================================

async function aplicarCupon() {
  const input  = document.getElementById('cuponInput');
  const btn    = document.getElementById('cuponBtn');
  const codigo = input ? input.value.trim().toUpperCase() : '';

  if (!codigo) {
    mostrarMsgCupon('Ingresa un código de cupón', 'error');
    return;
  }

  btn.textContent = 'Verificando...';
  btn.disabled = true;

  try {
    const response = await fetch('https://trabajo-de-ventaaaas.vercel.app/api/validar-cupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cupon:    codigo,
        subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      mostrarMsgCupon(data.error || 'Cupón inválido', 'error');
      cuponAplicado  = null;
      descuentoMonto = 0;
    } else {
      cuponAplicado  = data.cupon;
      descuentoMonto = data.descuento_aplicado || 0;
      const tipo = cuponAplicado.tipo === 'porcentaje'
        ? cuponAplicado.descuento + '%'
        : 'S/ ' + cuponAplicado.descuento;
      mostrarMsgCupon('✓ Cupón ' + cuponAplicado.codigo + ' aplicado — ' + tipo + ' de descuento', 'ok');
      document.getElementById('cuponQuitarBtn').style.display = 'block';
    }
  } catch (err) {
    mostrarMsgCupon('Error al verificar el cupón. Intenta de nuevo.', 'error');
  }

  btn.textContent = 'Aplicar';
  btn.disabled = false;
  renderOrderSummary();
}

function quitarCupon() {
  cuponAplicado  = null;
  descuentoMonto = 0;
  const input = document.getElementById('cuponInput');
  if (input) input.value = '';
  mostrarMsgCupon('', '');
  renderOrderSummary();
}

function mostrarMsgCupon(msg, tipo) {
  const el = document.getElementById('cuponMsg');
  if (!el) return;
  el.textContent = msg;
  el.style.color  = tipo === 'ok' ? '#22c55e' : tipo === 'error' ? '#ff3b5c' : 'transparent';
  el.style.display = msg ? 'block' : 'none';
}

// ============================================
// RESUMEN DEL PEDIDO
// ============================================

function renderOrderSummary() {
  const container = document.getElementById('orderItems');
  const totalEl   = document.getElementById('orderTotal');
  const finalEl   = document.getElementById('orderTotalFinal');
  const descEl    = document.getElementById('orderDescuento');
  const descRow   = document.getElementById('descuentoRow');
  const countEl   = document.getElementById('cartCount');

  const subtotal = getSubtotal();
  const total    = getTotal();
  const count    = cart.reduce((s, i) => s + i.qty, 0);

  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = 'S/ ' + subtotal.toLocaleString();
  if (finalEl) finalEl.textContent = 'S/ ' + total.toLocaleString();

  if (descRow) descRow.style.display = descuentoMonto > 0 ? 'flex' : 'none';
  if (descEl)  descEl.textContent    = '− S/ ' + descuentoMonto.toLocaleString();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="summary-empty"><p>Tu carrito está vacío.</p><a href="index.html" class="back-link">← Volver a la tienda</a></div>';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.imgs ? item.imgs[0] : item.img}" alt="${item.name}" class="summary-img" onerror="this.style.display='none'">
      <div class="summary-info">
        <div class="summary-name">${item.name}</div>
        <div class="summary-qty">Cantidad: ${item.qty}</div>
      </div>
      <div class="summary-right">
        <div class="summary-price">S/ ${(item.price * item.qty).toLocaleString()}</div>
        <button class="summary-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');
}

// ============================================
// VALIDACIÓN
// ============================================

function validateForm(form) {
  const required = ['nombre', 'whatsapp', 'email', 'departamento', 'distrito', 'direccion', 'referencia', 'turno'];
  let isValid = true;

  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  document.querySelectorAll('.error-msg').forEach(el => el.remove());

  const minLength = { direccion: 10, referencia: 5 };

  required.forEach(name => {
    const field = form.elements[name];
    if (!field || !field.value.trim()) {
      field.classList.add('field-error');
      const msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = 'Este campo es obligatorio';
      field.parentNode.appendChild(msg);
      isValid = false;
    } else if (minLength[name] && field.value.trim().length < minLength[name]) {
      field.classList.add('field-error');
      const msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = `Ingresa una ${name === 'direccion' ? 'dirección' : 'referencia'} más detallada (mín. ${minLength[name]} caracteres)`;
      field.parentNode.appendChild(msg);
      isValid = false;
    }
  });

  const emailField = form.elements['email'];
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.classList.add('field-error');
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.textContent = 'Ingresa un correo válido';
    emailField.parentNode.appendChild(msg);
    isValid = false;
  }

  const waField = form.elements['whatsapp'];
  if (waField && waField.value && !/^\d{9,15}$/.test(waField.value.replace(/\s/g, ''))) {
    waField.classList.add('field-error');
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.textContent = 'Ingresa un número válido (9 dígitos)';
    waField.parentNode.appendChild(msg);
    isValid = false;
  }

  const terminos = document.getElementById('terminos');
  if (terminos && !terminos.checked) {
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.style.display = 'block';
    msg.style.marginTop = '8px';
    msg.textContent = 'Debes aceptar los términos y condiciones';
    terminos.closest('.form-terms').appendChild(msg);
    isValid = false;
  }

  return isValid;
}

// ============================================
// SUBMIT
// ============================================

function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de continuar.');
      return;
    }

    if (!validateForm(form)) return;

    const formData = {
      nombre:       form.elements['nombre'].value.trim(),
      whatsapp:     form.elements['whatsapp'].value.trim(),
      email:        form.elements['email'].value.trim(),
      departamento: form.elements['departamento'].value,
      distrito:     form.elements['distrito'].value.trim(),
      direccion:    form.elements['direccion'].value.trim(),
      referencia:   form.elements['referencia'].value.trim(),
      turno:        form.elements['turno'].value,
      regalo:       form.elements['regalo'].value,
      fuente:       form.elements['fuente'].value,
      nota:         form.elements['nota'].value.trim()
    };

    const cuponCodigo = cuponAplicado ? cuponAplicado.codigo : '';
    await iniciarPagoMP(cart, formData, cuponCodigo, descuentoMonto);
  });
}

// ============================================
// CURSOR
// ============================================

function initCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'; cursor.style.top  = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px'; ring.style.top    = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => { cursor.style.width = '8px';  cursor.style.height = '8px';  });
  document.addEventListener('mouseup',   () => { cursor.style.width = '12px'; cursor.style.height = '12px'; });
}

// ============================================
// COUNTDOWN
// ============================================

function initCountdown() {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const endTime = midnight.getTime();

  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const rem = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    const el = document.getElementById('countdown');
    if (el) el.textContent = pad(Math.floor(rem/3600)) + ':' + pad(Math.floor((rem%3600)/60)) + ':' + pad(rem%60);
  }
  tick(); setInterval(tick, 1000);
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  loadCart();
  // Sincronizar precios del carrito con los precios actuales de la API
  try {
    const res = await fetch('/api/productos');
    if (res.ok) {
      const productosAPI = await res.json();
      cart = cart.map(item => {
        const p = productosAPI.find(p => p.id === item.id);
        return p ? { ...item, price: p.price } : item;
      });
      saveCart();
    }
  } catch (e) { /* continuar con precios del localStorage */ }
  renderOrderSummary();
  initCheckoutForm();
  initCursor();
  initCountdown();
});
