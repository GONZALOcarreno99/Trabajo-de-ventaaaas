# LUMIÈRE — Guía de configuración

## Estructura del proyecto

```
lumiere/
├── index.html          → Página principal (home)
├── checkout.html       → Página de checkout con formulario
├── gracias.html        → Página de confirmación de pedido
├── styles.css          → Estilos globales (todas las páginas)
├── checkout.css        → Estilos específicos del checkout
├── main.js             → Lógica del home (carrito, productos, etc.)
├── checkout.js         → Lógica del checkout (formulario, WhatsApp, email)
└── productos/          → Carpeta con tus imágenes de productos
    ├── creap.jpg
    ├── cara.jpg
    ├── dior.jpg
    └── versace.jpg
```

---

## ⚙️ Configuración obligatoria (antes de lanzar)

### 1. Tu número de WhatsApp
Busca esta línea en **dos archivos** y cambia el número:

**En `index.html`** (línea ~200):
```js
const WA_NUMBER = '51999999999';
```

**En `checkout.js`** (línea ~15):
```js
whatsappNumber: '51999999999',
```

**En `gracias.html`** (línea ~195):
```js
window.open(`https://wa.me/51999999999?text=...`
```

El formato es: código de país + número sin espacios ni +
Ejemplo Perú: `51987654321`

---

### 2. Tus productos
En `main.js` y `checkout.js` edita el array `products` con tus productos reales:
```js
{
  id: 1,
  name: 'Nombre del producto',
  desc: 'Descripción corta',
  price: 189,       // precio con descuento
  old: 269,         // precio original (tachado)
  img: 'productos/tu-imagen.jpg',
  rating: 4.9,
  reviews: 2841,
  badge: 'stock',   // 'stock', 'new', o '' (vacío = sin badge)
  badgeText: 'Últimas 8'
}
```

---

### 3. Email de confirmación (opcional pero recomendado)
1. Crea cuenta gratis en https://emailjs.com
2. Crea un "Email Service" conectando tu Gmail o correo
3. Crea un "Email Template" con estas variables:
   - `{{to_name}}` — nombre del cliente
   - `{{to_email}}` — email del cliente
   - `{{productos}}` — lista de productos
   - `{{total}}` — total del pedido
   - `{{direccion}}` — dirección de entrega
   - `{{turno}}` — turno de entrega
4. Copia tus IDs en `checkout.js`:
```js
emailjs: {
  serviceId:  'service_xxxxxxx',
  templateId: 'template_xxxxxxx',
  publicKey:  'xxxxxxxxxxxxxx'
}
```

---

## 🚀 Cómo funciona el checkout

1. Cliente agrega productos al carrito en `index.html`
2. El carrito se guarda automáticamente (si cierra el navegador no se pierde)
3. Hace clic en "Finalizar Compra" → va a `checkout.html`
4. Llena el formulario con sus datos
5. Al confirmar:
   - Se abre WhatsApp con el mensaje del pedido prellenado
   - El cliente solo presiona "Enviar"
   - Se le envía email de confirmación (si tienes EmailJS configurado)
   - Va a `gracias.html` con el resumen del pedido
6. Tú recibes el pedido en tu WhatsApp y coordinas el envío

---

## 📱 Flujo del mensaje en WhatsApp

```
🛍️ NUEVO PEDIDO — LUMIÈRE
━━━━━━━━━━━━━━━━━━━━
👤 Cliente: María García
📞 WhatsApp: 987654321
📧 Correo: maria@gmail.com

📍 Dirección de envío:
  Departamento: Lima
  Distrito: Miraflores
  Dirección: Av. Larco 123
  Referencia: Frente al BCP

🕐 Turno preferido: Tarde (1pm - 6pm)
🎁 ¿Es un regalo? No
📣 Nos conoció por: Instagram

🛒 Productos:
  • Sérum Nebula x1 — S/ 189
  • Labial Plasma x2 — S/ 148

━━━━━━━━━━━━━━━━━━━━
💰 TOTAL: S/ 337
```

---

## 🌐 Cómo publicar tu tienda gratis

### Opción A — Netlify (recomendado, gratis)
1. Ve a https://netlify.com y crea cuenta gratis
2. Arrastra toda la carpeta del proyecto a la zona de deploy
3. ¡Listo! Te dan una URL tipo `lumiere-abc123.netlify.app`
4. Puedes conectar tu dominio propio si tienes uno

### Opción B — GitHub Pages (gratis)
1. Crea repositorio en GitHub
2. Sube todos los archivos
3. Ve a Settings → Pages → selecciona main branch
4. Tu URL será `tuusuario.github.io/lumiere`

---

## ✅ Checklist antes de lanzar

- [ ] Cambié mi número de WhatsApp en los 3 archivos
- [ ] Actualicé los productos con mis datos reales
- [ ] Subí mis imágenes a la carpeta `productos/`
- [ ] Probé el carrito: agregar, eliminar, ver total
- [ ] Probé el checkout: llenré el formulario y llegó el WhatsApp
- [ ] Configuré EmailJS (opcional)
- [ ] Probé en móvil que todo se ve bien
- [ ] Publiqué en Netlify o GitHub Pages
