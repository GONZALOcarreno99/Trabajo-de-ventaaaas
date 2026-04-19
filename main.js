/* ============================================
   LUMIÈRE — main.js
   Sistema completo de productos con categorías,
   filtros, modal de detalle y carrito
   ============================================ */

'use strict';

// ============================================
// PRODUCTOS — 20 productos con fichas técnicas
// ============================================

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Sérum Nebula',
    desc: 'Activador celular cuántico',
    category: 'serums',
    price: 189, old: 269,
    imgs: ['productos/creap.jpg'],
    rating: 4.9, reviews: 2841,
    badge: 'stock', badgeText: 'Últimas 8',
    peso: '30 ml',
    modo_uso: 'Aplicar 2-3 gotas sobre el rostro limpio. Masajear suavemente en movimientos circulares ascendentes. Usar mañana y noche.',
    ingredientes: 'Aqua, Niacinamide 10%, Hyaluronic Acid, Retinol 0.1%, Vitamin C, Peptide Complex, Aloe Vera Extract, Glycerin.',
    beneficios: ['Reduce arrugas en 72h', 'Hidratación profunda 24h', 'Ilumina el tono de piel', 'Estimula el colágeno'],
    para_quien: 'Todo tipo de piel. Especialmente recomendado para piel madura o con signos de envejecimiento.'
  },
  {
    id: 2,
    name: 'Palette Aurora',
    desc: '18 tonos holográficos',
    category: 'maquillaje',
    price: 134, old: 189,
    imgs: ['productos/cara.jpg'],
    rating: 4.8, reviews: 1932,
    badge: 'new', badgeText: 'Nuevo',
    peso: '18 x 1.5g',
    modo_uso: 'Aplicar con pincel o dedos sobre párpados limpios y preparados con base. Para mayor intensidad, aplicar húmedo.',
    ingredientes: 'Mica, Talc, Zinc Stearate, Dimethicone, Silica, Carmine, Titanium Dioxide, Iron Oxides.',
    beneficios: ['18 tonos únicos', 'Alta pigmentación', 'Duración 12 horas', 'Finish holográfico'],
    para_quien: 'Apta para todo tipo de piel. Dermatológicamente testeada.'
  },
  {
    id: 3,
    name: 'Cosmos Noir Cream',
    desc: 'Regeneración nocturna profunda',
    category: 'cremas',
    price: 159, old: 229,
    imgs: ['productos/dior.jpg'],
    rating: 4.9, reviews: 3102,
    badge: 'stock', badgeText: 'Últimas 12',
    peso: '50 ml',
    modo_uso: 'Aplicar cada noche sobre rostro y cuello con movimientos suaves. Dejar actuar durante 8 horas mientras duermes.',
    ingredientes: 'Aqua, Shea Butter, Retinol Complex, Peptide Matrix, Hyaluronic Acid, Ceramides, Vitamin E, Jojoba Oil.',
    beneficios: ['Regeneración celular nocturna', 'Reduce manchas oscuras', 'Textura sedosa', 'Efecto antienvejecimiento'],
    para_quien: 'Piel seca, mixta o madura. No recomendado para piel muy grasa.'
  },
  {
    id: 4,
    name: 'Labial Plasma',
    desc: 'Pigmento de larga duración 24h',
    category: 'labiales',
    price: 74, old: 99,
    imgs: ['productos/versace.jpg'],
    rating: 4.7, reviews: 4218,
    badge: '', badgeText: '',
    peso: '3.5g',
    modo_uso: 'Aplicar directamente sobre labios. Para mayor precisión usar el borde del labial. No requiere delineador.',
    ingredientes: 'Ricinus Communis Oil, Cera Alba, Carnauba Wax, Vitamin E, Hyaluronic Acid, Pigments.',
    beneficios: ['Duración 24 horas', 'No se corre', 'Hidrata los labios', 'Color ultra intenso'],
    para_quien: 'Apto para todo tipo de labios. No testado en animales.'
  },
  {
    id: 5,
    name: 'Eye Matrix',
    desc: 'Contorno de ojos biofotónico',
    category: 'ojos',
    price: 119, old: 169,
    imgs: ['productos/creap.jpg'],
    rating: 4.8, reviews: 1567,
    badge: 'new', badgeText: 'Nuevo',
    peso: '15 ml',
    modo_uso: 'Aplicar con el aplicador en el contorno del ojo. Dar pequeños toquecitos hasta absorción. Usar mañana y noche.',
    ingredientes: 'Aqua, Caffeine 5%, Peptide Eye Complex, Hyaluronic Acid, Vitamin K, Aloe Vera, Cucumber Extract.',
    beneficios: ['Elimina ojeras en 7 días', 'Reduce bolsas', 'Efecto tensor inmediato', 'Hidratación intensa'],
    para_quien: 'Todo tipo de piel. Especialmente para piel con ojeras o signos de cansancio.'
  },
  {
    id: 6,
    name: 'Solar Shield SPF 60',
    desc: 'Protección UV inteligente',
    category: 'proteccion',
    price: 89, old: 129,
    imgs: ['productos/creap.jpg'],
    rating: 4.9, reviews: 2290,
    badge: 'stock', badgeText: 'Casi agotado',
    peso: '50 ml',
    modo_uso: 'Aplicar 15 minutos antes de exposición solar. Reaplicar cada 2 horas. Usar como último paso de tu rutina.',
    ingredientes: 'Zinc Oxide, Titanium Dioxide, Hyaluronic Acid, Vitamin C, Niacinamide, Aloe Vera, Aqua.',
    beneficios: ['Protección UVA/UVB', 'SPF 60 PA++++', 'No deja residuo blanco', 'Hidrata mientras protege'],
    para_quien: 'Todo tipo de piel. Indispensable uso diario.'
  },
  {
    id: 7,
    name: 'Glow Essence',
    desc: 'Esencia iluminadora celestial',
    category: 'serums',
    price: 145, old: 199,
    imgs: ['productos/creap.jpg'],
    rating: 4.8, reviews: 987,
    badge: 'new', badgeText: 'Nuevo',
    peso: '30 ml',
    modo_uso: 'Aplicar 3-4 gotas sobre rostro limpio antes de la crema hidratante. Usar preferentemente en la noche.',
    ingredientes: 'Aqua, Vitamin C 15%, Alpha Arbutin, Ferulic Acid, Niacinamide, Rose Hip Oil, Squalane.',
    beneficios: ['Ilumina al instante', 'Unifica el tono', 'Antioxidante potente', 'Reduce hiperpigmentación'],
    para_quien: 'Piel con manchas, opaca o con tono irregular.'
  },
  {
    id: 8,
    name: 'Velvet Foundation',
    desc: 'Base de cobertura total aterciopelada',
    category: 'maquillaje',
    price: 112, old: 159,
    imgs: ['productos/cara.jpg'],
    rating: 4.7, reviews: 2103,
    badge: '', badgeText: '',
    peso: '30 ml',
    modo_uso: 'Aplicar con brocha, esponja o dedos. Difuminar desde el centro hacia afuera. Fijar con polvo translúcido.',
    ingredientes: 'Aqua, Cyclopentasiloxane, Dimethicone, Titanium Dioxide, Iron Oxides, Glycerin, Vitamin E.',
    beneficios: ['Cobertura total buildable', 'Duración 16 horas', 'Finish aterciopelado', '30 tonos disponibles'],
    para_quien: 'Todo tipo de piel. Especialmente piel con imperfecciones.'
  },
  {
    id: 9,
    name: 'Midnight Repair',
    desc: 'Mascarilla nocturna de lujo',
    category: 'cremas',
    price: 175, old: 249,
    imgs: ['productos/dior.jpg'],
    rating: 4.9, reviews: 1456,
    badge: 'stock', badgeText: 'Últimas 5',
    peso: '75 ml',
    modo_uso: 'Aplicar generosamente como último paso de tu rutina nocturna. No enjuagar. Dejar actuar toda la noche.',
    ingredientes: 'Shea Butter, Squalane, Bakuchiol, Peptide Complex, Ceramides, Hyaluronic Acid, Rose Extract.',
    beneficios: ['Reparación intensiva overnight', 'Piel como nueva al despertar', 'Ultra nutritiva', 'Efecto plumping'],
    para_quien: 'Piel seca, deshidratada o muy sensible.'
  },
  {
    id: 10,
    name: 'Lip Gloss Pulsar',
    desc: 'Gloss voluminizador con efecto plumping',
    category: 'labiales',
    price: 59, old: 85,
    imgs: ['productos/versace.jpg'],
    rating: 4.6, reviews: 3421,
    badge: 'new', badgeText: 'Nuevo',
    peso: '5 ml',
    modo_uso: 'Aplicar sobre labios desnudos o sobre labial. Para mayor volumen aplicar en el centro del labio superior.',
    ingredientes: 'Ricinus Communis Oil, Polybutene, Peppermint Oil, Vitamin E, Hyaluronic Acid, Collagen Peptides.',
    beneficios: ['Volumen inmediato', 'Efecto plumping visible', 'Brillo ultra reflectante', 'Hidratación intensa'],
    para_quien: 'Para quien desea labios más voluminosos y jugosos.'
  },
  {
    id: 11,
    name: 'Mascara Cosmos',
    desc: 'Máscara de pestañas volumizadora 4D',
    category: 'ojos',
    price: 79, old: 110,
    imgs: ['productos/cara.jpg'],
    rating: 4.8, reviews: 5234,
    badge: '', badgeText: '',
    peso: '10 ml',
    modo_uso: 'Aplicar en zigzag desde la raíz hasta las puntas. Para mayor volumen aplicar una segunda capa antes de que seque.',
    ingredientes: 'Aqua, Beeswax, Carnauba Wax, Iron Oxides, Panthenol, Biotin, Vitamin B5.',
    beneficios: ['Volumen 4D extremo', 'No mancha', 'Resistente al agua', 'Alarga y riza'],
    para_quien: 'Todo tipo de pestañas. Especialmente finas o cortas.'
  },
  {
    id: 12,
    name: 'Hydra Boost Cream',
    desc: 'Crema hidratante de ácido hialurónico puro',
    category: 'cremas',
    price: 129, old: 179,
    imgs: ['productos/dior.jpg'],
    rating: 4.9, reviews: 2876,
    badge: '', badgeText: '',
    peso: '50 ml',
    modo_uso: 'Aplicar sobre rostro limpio mañana y noche. Ideal como base antes del maquillaje. Masajear hasta completa absorción.',
    ingredientes: 'Aqua, Hyaluronic Acid 2%, Glycerin, Ceramides, Aloe Vera, Panthenol, Niacinamide, Vitamin B5.',
    beneficios: ['Hidratación 72 horas', 'Rellena líneas de expresión', 'Textura ultraligera', 'Apta para piel sensible'],
    para_quien: 'Todo tipo de piel. Especialmente piel deshidratada.'
  },
  {
    id: 13,
    name: 'Retinol Night Force',
    desc: 'Tratamiento intensivo antiedad con retinol puro',
    category: 'serums',
    price: 215, old: 299,
    imgs: ['productos/creap.jpg'],
    rating: 4.9, reviews: 1123,
    badge: 'stock', badgeText: 'Premium',
    peso: '30 ml',
    modo_uso: 'Usar solo por las noches. Aplicar 2-3 gotas sobre rostro limpio y seco. Comenzar 2 veces por semana e ir aumentando.',
    ingredientes: 'Aqua, Retinol 0.5%, Peptide Matrix, Hyaluronic Acid, Vitamin E, Squalane, Niacinamide.',
    beneficios: ['Anti-aging clínico', 'Reduce arrugas profundas', 'Regenera la piel', 'Resultados en 4 semanas'],
    para_quien: 'Piel madura. No recomendado para embarazadas. Usar protector solar obligatoriamente.'
  },
  {
    id: 14,
    name: 'Contouring Pro',
    desc: 'Kit de contorno y iluminación profesional',
    category: 'maquillaje',
    price: 98, old: 139,
    imgs: ['productos/cara.jpg'],
    rating: 4.7, reviews: 1876,
    badge: 'new', badgeText: 'Nuevo',
    peso: '2 x 8g',
    modo_uso: 'Aplicar el tono oscuro en las zonas a contornear con pincel angular. El iluminador en los puntos altos del rostro.',
    ingredientes: 'Mica, Talc, Silica, Zinc Stearate, Dimethicone, Vitamin E, Iron Oxides, Titanium Dioxide.',
    beneficios: ['Contorno profesional', 'Iluminador intenso', 'Larga duración', 'Blendable fácil'],
    para_quien: 'Todo tipo de piel y tono.'
  },
  {
    id: 15,
    name: 'Rose Petal Toner',
    desc: 'Tónico equilibrante de rosas de Damasco',
    category: 'serums',
    price: 69, old: 95,
    imgs: ['productos/creap.jpg'],
    rating: 4.6, reviews: 2341,
    badge: '', badgeText: '',
    peso: '150 ml',
    modo_uso: 'Aplicar sobre algodón o directamente con las manos tras la limpieza. Dar toquecitos suaves hasta absorción.',
    ingredientes: 'Rosa Damascena Water, Glycerin, Niacinamide, Aloe Vera, Witch Hazel, Centella Asiatica, Hyaluronic Acid.',
    beneficios: ['Equilibra el pH de la piel', 'Minimiza poros', 'Refresca e hidrata', 'Aroma floral natural'],
    para_quien: 'Todo tipo de piel. Especialmente piel mixta o con poros dilatados.'
  },
  {
    id: 16,
    name: 'Lip Liner Stellar',
    desc: 'Delineador de labios de larga duración',
    category: 'labiales',
    price: 45, old: 65,
    imgs: ['productos/versace.jpg'],
    rating: 4.7, reviews: 1987,
    badge: '', badgeText: '',
    peso: '1.2g',
    modo_uso: 'Delinear el contorno natural del labio. Se puede usar para rellenar el labio completo como base de labial.',
    ingredientes: 'Cera Alba, Carnauba Wax, Ricinus Communis Oil, Vitamin E, Iron Oxides, Titanium Dioxide.',
    beneficios: ['Precisión máxima', 'No se corre', 'Duración 12 horas', 'Define y agranda labios'],
    para_quien: 'Para un maquillaje de labios preciso y duradero.'
  },
  {
    id: 17,
    name: 'Eye Shadow Stellar',
    desc: 'Sombra individual de alta pigmentación',
    category: 'ojos',
    price: 55, old: 79,
    imgs: ['productos/cara.jpg'],
    rating: 4.8, reviews: 3102,
    badge: '', badgeText: '',
    peso: '2g',
    modo_uso: 'Aplicar con pincel o dedo sobre párpado. Para look ahumado difuminar los bordes con pincel difuminador.',
    ingredientes: 'Mica, Talc, Zinc Stearate, Silica, Dimethicone, Carmine, Ultramarines, Iron Oxides.',
    beneficios: ['Pigmentación extrema', 'Brillo metálico intenso', 'Duración 10 horas', '40 tonos disponibles'],
    para_quien: 'Todo tipo de piel. Dermatológicamente testeada y oftalmológicamente aprobada.'
  },
  {
    id: 18,
    name: 'UV Defense Mist',
    desc: 'Bruma protectora SPF 50 para retocar',
    category: 'proteccion',
    price: 75, old: 105,
    imgs: ['productos/creap.jpg'],
    rating: 4.7, reviews: 1234,
    badge: 'new', badgeText: 'Nuevo',
    peso: '100 ml',
    modo_uso: 'Agitar bien. Rociar a 20cm del rostro con ojos cerrados. Usar cada 2 horas como retoque sobre maquillaje.',
    ingredientes: 'Aqua, Ethylhexyl Methoxycinnamate, Zinc Oxide, Glycerin, Hyaluronic Acid, Aloe Vera, Vitamin C.',
    beneficios: ['Retoca sin arruinar el maquillaje', 'SPF 50 PA+++', 'Fija el maquillaje', 'Efecto refrescante'],
    para_quien: 'Para quienes necesitan protección durante el día sin retirar el maquillaje.'
  },
  {
    id: 19,
    name: 'Elixir Noir Perfume',
    desc: 'Eau de Parfum edición limitada',
    category: 'premium',
    price: 289, old: 389,
    imgs: ['productos/versace.jpg'],
    rating: 5.0, reviews: 456,
    badge: 'stock', badgeText: 'Ed. Limitada',
    peso: '50 ml',
    modo_uso: 'Aplicar en puntos de calor: muñecas, cuello, detrás de las orejas. No frotar para preservar las notas.',
    ingredientes: 'Alcohol Denat., Aqua, Parfum, Rosa Damascena, Jasmine, Oud Wood, Vanilla, Musk, Bergamot.',
    beneficios: ['Duración 8-12 horas', 'Estela intensa', 'Notas únicas de Oud', 'Edición limitada coleccionable'],
    para_quien: 'Para quien busca una fragancia sofisticada y memorable.'
  },
  {
    id: 20,
    name: 'Gold Collagen Mask',
    desc: 'Mascarilla de colágeno y partículas de oro 24k',
    category: 'premium',
    price: 245, old: 345,
    imgs: ['productos/dior.jpg'],
    rating: 4.9, reviews: 789,
    badge: 'stock', badgeText: 'Premium',
    peso: '5 x 25ml',
    modo_uso: 'Limpiar el rostro. Aplicar la mascarilla 20-30 minutos. Retirar y masajear el exceso hasta absorción. 2 veces por semana.',
    ingredientes: 'Collagen, Gold 24K, Hyaluronic Acid, Peptide Complex, Vitamin C, Rose Extract, Aloe Vera.',
    beneficios: ['Efecto lifting inmediato', 'Iluminación extrema', 'Anti-aging intensivo', 'Textura lámina dorada'],
    para_quien: 'Para ocasiones especiales o tratamiento intensivo antiedad.'
  }
];

let products = [...DEFAULT_PRODUCTS];

// ============================================
// CATEGORÍAS
// ============================================

const categories = [
  { id: 'all',       label: 'Todos'        },
  { id: 'serums',    label: 'Sérums'       },
  { id: 'cremas',    label: 'Cremas'       },
  { id: 'maquillaje',label: 'Maquillaje'   },
  { id: 'labiales',  label: 'Labiales'     },
  { id: 'ojos',      label: 'Ojos'         },
  { id: 'proteccion',label: 'Protección'   },
  { id: 'premium',   label: '⭐ Premium'   }
];

// ============================================
// ESTADO
// ============================================

let cart        = loadCart();
let activeCategory = 'all';
let activeSort     = 'default';

function loadCart() {
  try { return JSON.parse(localStorage.getItem('lumiere_cart')) || []; }
  catch { return []; }
}

function saveCart() {
  localStorage.setItem('lumiere_cart', JSON.stringify(cart));
}

// ============================================
// FILTROS Y ORDENAMIENTO
// ============================================

function getFilteredProducts() {
  let list = [...products];

  if (activeCategory !== 'all') {
    list = list.filter(p => p.category === activeCategory);
  }

  switch (activeSort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'alpha':      list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    case 'reviews':    list.sort((a, b) => b.reviews - a.reviews); break;
  }

  return list;
}

// ============================================
// RENDER FILTROS
// ============================================

function renderFilters() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Si ya existe solo actualizar estilos de botones activos
  if (document.getElementById('filterBar')) {
    document.querySelectorAll('[data-cat]').forEach(btn => {
      const isActive = btn.dataset.cat === activeCategory;
      btn.style.background = isActive ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' : 'rgba(255,255,255,0.05)';
      btn.style.borderColor = isActive ? 'transparent' : 'var(--glass-border)';
    });
    return;
  }

  const bar = document.createElement('div');
  bar.id = 'filterBar';
  bar.style.cssText = `
    max-width: 1200px; margin: 0 auto 32px;
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
    justify-content: space-between;
  `;

  // Categorías
  const cats = document.createElement('div');
  cats.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    const isActive = cat.id === activeCategory;
    btn.style.cssText = `
      padding: 8px 18px; border-radius: 2px; font-family: 'Rajdhani', sans-serif;
      font-size: 13px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
      transition: all 0.2s;
      background: ${isActive ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))' : 'rgba(255,255,255,0.05)'};
      border: 1px solid ${isActive ? 'transparent' : 'var(--glass-border)'};
      color: #fff;
    `;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      renderFilters();
      renderProducts();
    });
    cats.appendChild(btn);
  });

  // Ordenar
  const sortWrap = document.createElement('div');
  sortWrap.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap;';

  const sortLabel = document.createElement('span');
  sortLabel.textContent = 'Ordenar:';
  sortLabel.style.cssText = 'font-size:12px;letter-spacing:2px;color:var(--text-muted);text-transform:uppercase;';

  const select = document.createElement('select');
  select.style.cssText = `
    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
    border-radius: 2px; padding: 8px 14px; color: var(--text);
    font-family: 'Rajdhani', sans-serif; font-size: 13px; cursor: pointer;
    outline: none;
  `;
  [
    { val: 'default',    label: 'Destacados'      },
    { val: 'price-asc',  label: 'Menor precio'    },
    { val: 'price-desc', label: 'Mayor precio'    },
    { val: 'alpha',      label: 'A → Z'           },
    { val: 'rating',     label: 'Mejor valorados' },
    { val: 'reviews',    label: 'Más reseñas'     }
  ].forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.val; o.textContent = opt.label;
    if (opt.val === activeSort) o.selected = true;
    select.appendChild(o);
  });
  select.addEventListener('change', () => {
    activeSort = select.value;
    renderProducts();
  });

  sortWrap.appendChild(sortLabel);
  sortWrap.appendChild(select);
  bar.appendChild(cats);
  bar.appendChild(sortWrap);

  grid.parentNode.insertBefore(bar, grid);
}

// ============================================
// RENDER PRODUCTOS
// ============================================

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  renderFilters();

  const list = getFilteredProducts();

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);">
        <p style="font-size:18px;">No hay productos en esta categoría</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const stockCount = p.stock !== undefined ? p.stock : 99;
    const soldOut    = stockCount === 0;
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img" onclick="openProductModal(${p.id})" style="cursor:pointer;position:relative;">
        ${soldOut                    ? `<div class="badge-stock" style="background:rgba(100,100,100,0.9);">AGOTADO</div>` : ''}
        ${!soldOut && p.badge === 'stock' ? `<div class="badge-stock">${p.badgeText}</div>` : ''}
        ${!soldOut && p.badge === 'new'   ? `<div class="badge-new">${p.badgeText}</div>`   : ''}
        <img src="${p.imgs[0]}" alt="${p.name}" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:cover;display:block;${soldOut ? 'opacity:0.5;' : ''}">
      </div>
      <div class="product-info">
        <div class="product-name" onclick="openProductModal(${p.id})" style="cursor:pointer;">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-num">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">S/ ${p.price}</span>
            <span class="price-old">S/ ${p.old}</span>
          </div>
          ${soldOut
            ? `<button class="add-cart" disabled style="opacity:0.45;cursor:not-allowed;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">Agotado</button>`
            : `<button class="add-cart" onclick="event.stopPropagation();addToCart(${p.id})">+ Añadir</button>`
          }
        </div>
      </div>
    </div>`;
  }).join('');
}

// ============================================
// MODAL DE PRODUCTO
// ============================================


// ============================================
// PRODUCTOS RELACIONADOS
// ============================================

function getRelatedProducts(producto, max) {
  return products
    .filter(p => p.id !== producto.id && p.category === producto.category)
    .slice(0, max)
    .concat(
      products.filter(p => p.id !== producto.id && p.category !== producto.category)
    )
    .slice(0, max);
}

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  // Eliminar modal previo
  const prev = document.getElementById('productModal');
  if (prev) prev.remove();

  const discount = Math.round((1 - p.price / p.old) * 100);

  const modal = document.createElement('div');
  modal.id = 'productModal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 500;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; overflow-y: auto;
    animation: fadeIn 0.3s ease;
  `;

  modal.innerHTML = `
    <style>
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
      #productModal .modal-inner { animation: slideUp 0.3s ease; }
      @media (max-width: 700px) {
        .modal-grid { grid-template-columns: 1fr !important; }
        .modal-grid > div:first-child { min-height: 220px !important; max-height: 260px !important; overflow: hidden !important; }
        .modal-grid > div:last-child { padding: 20px 16px !important; max-height: none !important; overflow-y: visible !important; }
        .modal-info-col { max-height: none !important; overflow-y: visible !important; padding: 20px 16px !important; }
        #productModal { align-items: flex-start !important; padding: 0 !important; overflow-y: auto !important; }
        #productModal .modal-inner { max-height: none !important; overflow: visible !important; border-radius: 0 !important; }
      }
    </style>
    <div class="modal-inner" style="
      background: #0a0a14; border: 1px solid var(--glass-border);
      border-radius: 8px; max-width: 900px; width: 100%;
      position: relative; overflow: hidden;
    ">
      <!-- CERRAR -->
      <button onclick="closeProductModal()" style="
        position:absolute;top:12px;right:12px;z-index:20;
        background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.2);
        width:44px;height:44px;border-radius:50%;color:#fff;
        font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;
        transition:all 0.2s;
      ">✕</button>

      <div style="display:grid;grid-template-columns:1fr 1fr;min-height:500px;" class="modal-grid">

        <!-- IMAGEN -->
        <div style="position:relative;background:var(--dark3);min-height:400px;overflow:hidden;display:flex;flex-direction:column;">
          <div style="flex:1;position:relative;min-height:340px;">
            <img id="modalMainImg" src="${p.imgs[0]}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;cursor:zoom-in;position:absolute;inset:0;"
              onclick="initZoomImagen(this.src, '${p.name}')"
              title="Clic para ampliar">
            <div style="position:absolute;top:16px;left:16px;background:linear-gradient(135deg,var(--neon-purple),var(--neon-pink));padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;">−${discount}%</div>
            <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:6px 10px;font-size:11px;color:#fff;font-family:'Rajdhani',sans-serif;letter-spacing:1px;pointer-events:none;">🔍 Clic para ampliar</div>
          </div>
          ${p.imgs.length > 1 ? `
          <div style="display:flex;gap:6px;padding:10px;background:rgba(0,0,0,0.4);overflow-x:auto;">
            ${p.imgs.map((img, idx) => `
              <img src="${img}" alt="${p.name} ${idx+1}"
                onclick="document.getElementById('modalMainImg').src='${img}';document.getElementById('modalMainImg').onclick=function(){initZoomImagen('${img}','${p.name}')}"
                style="width:56px;height:56px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid ${idx===0?'var(--neon-purple)':'rgba(255,255,255,0.15)'};flex-shrink:0;transition:border-color 0.2s;"
                onmouseover="this.style.borderColor='var(--neon-purple)'" onmouseout="this.style.borderColor='${idx===0?'var(--neon-purple)':'rgba(255,255,255,0.15)'}'" />
            `).join('')}
          </div>` : ''}
        </div>

        <!-- INFO -->
        <div style="padding:40px 36px;overflow-y:auto;max-height:600px;" class="modal-info-col">
          <div style="font-size:11px;letter-spacing:4px;color:var(--neon-purple);text-transform:uppercase;margin-bottom:8px;">
            ${categories.find(c => c.id === p.category)?.label || ''}
          </div>
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin-bottom:8px;">${p.name}</h2>
          <p style="color:var(--text-muted);font-size:15px;margin-bottom:16px;">${p.desc}</p>

          <!-- RATING -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
            <span style="color:#f59e0b;">★★★★★</span>
            <span style="font-size:14px;color:var(--text-muted);">${p.rating} · ${p.reviews.toLocaleString()} reseñas</span>
          </div>

          <!-- PRECIO -->
          <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:24px;">
            <span style="font-size:32px;font-weight:600;background:linear-gradient(135deg,#fff,var(--neon-purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">S/ ${p.price}</span>
            <span style="font-size:18px;color:var(--text-muted);text-decoration:line-through;">S/ ${p.old}</span>
          </div>

          <!-- PESO -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px;padding:12px 16px;background:rgba(180,95,255,0.06);border:1px solid rgba(180,95,255,0.15);border-radius:4px;">
            <span style="font-size:13px;color:var(--text-muted);">Contenido:</span>
            <span style="font-size:14px;font-weight:600;color:var(--neon-purple);">${p.peso}</span>
          </div>

          <!-- BENEFICIOS -->
          <div style="margin-bottom:20px;">
            <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px;">Beneficios</p>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${p.beneficios.map(b => `
                <div style="display:flex;align-items:center;gap:8px;font-size:14px;">
                  <span style="color:var(--neon-purple);font-size:16px;">✓</span>
                  <span>${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- BOTÓN -->
          <button onclick="addToCart(${p.id}); closeProductModal();" style="
            width:100%;background:linear-gradient(135deg,var(--neon-purple),var(--neon-pink));
            border:none;padding:18px;border-radius:4px;color:#fff;
            font-family:'Rajdhani',sans-serif;font-size:15px;letter-spacing:3px;
            text-transform:uppercase;cursor:pointer;margin-bottom:16px;
            transition:transform 0.2s,box-shadow 0.3s;
          " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 40px rgba(180,95,255,0.5)'"
             onmouseout="this.style.transform='none';this.style.boxShadow='none'">
            + Añadir al carrito
          </button>

          <!-- ACCORDION -->
          <div style="border-top:1px solid var(--glass-border);padding-top:16px;">

            <div style="border-bottom:1px solid var(--glass-border);">
              <button onclick="toggleAccordion('modo')" style="
                width:100%;background:none;border:none;color:var(--text);
                font-family:'Rajdhani',sans-serif;font-size:14px;letter-spacing:1px;
                text-transform:uppercase;padding:14px 0;cursor:pointer;
                display:flex;justify-content:space-between;align-items:center;
              ">Modo de uso <span id="icon-modo">+</span></button>
              <div id="acc-modo" style="display:none;padding-bottom:14px;font-size:14px;color:var(--text-muted);line-height:1.7;">${p.modo_uso}</div>
            </div>

            <div style="border-bottom:1px solid var(--glass-border);">
              <button onclick="toggleAccordion('ing')" style="
                width:100%;background:none;border:none;color:var(--text);
                font-family:'Rajdhani',sans-serif;font-size:14px;letter-spacing:1px;
                text-transform:uppercase;padding:14px 0;cursor:pointer;
                display:flex;justify-content:space-between;align-items:center;
              ">Ingredientes <span id="icon-ing">+</span></button>
              <div id="acc-ing" style="display:none;padding-bottom:14px;font-size:13px;color:var(--text-muted);line-height:1.7;">${p.ingredientes}</div>
            </div>

            <div>
              <button onclick="toggleAccordion('para')" style="
                width:100%;background:none;border:none;color:var(--text);
                font-family:'Rajdhani',sans-serif;font-size:14px;letter-spacing:1px;
                text-transform:uppercase;padding:14px 0;cursor:pointer;
                display:flex;justify-content:space-between;align-items:center;
              ">¿Para quién? <span id="icon-para">+</span></button>
              <div id="acc-para" style="display:none;padding-bottom:14px;font-size:14px;color:var(--text-muted);line-height:1.7;">${p.para_quien}</div>
            </div>

          </div>

          <!-- PRODUCTOS RELACIONADOS EN MODAL -->
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--glass-border);">
            <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--text-muted);margin-bottom:14px;">✦ También te puede interesar</p>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
              ${getRelatedProducts(p, 3).map(r => `
                <div onclick="closeProductModal();setTimeout(()=>openProductModal(${r.id}),100)" style="
                  background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);
                  border-radius:6px;overflow:hidden;cursor:pointer;transition:border-color 0.2s;
                " onmouseover="this.style.borderColor='rgba(180,95,255,0.4)'"
                   onmouseout="this.style.borderColor='var(--glass-border)'">
                  <img src="${r.imgs[0]}" alt="${r.name}" style="width:100%;height:70px;object-fit:cover;display:block;" onerror="this.style.display='none'">
                  <div style="padding:8px;">
                    <div style="font-size:12px;color:#f0eeff;margin-bottom:2px;line-height:1.3;">${r.name}</div>
                    <div style="font-size:12px;color:#b45fff;font-weight:600;">S/ ${r.price}</div>
                    <button onclick="event.stopPropagation();addToCart(${r.id})" style="
                      width:100%;margin-top:6px;background:rgba(180,95,255,0.15);
                      border:1px solid rgba(180,95,255,0.3);border-radius:3px;
                      padding:5px;color:#b45fff;font-family:'Rajdhani',sans-serif;
                      font-size:11px;letter-spacing:1px;cursor:pointer;
                    ">+ Añadir</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
  });

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.remove();
  document.body.style.overflow = '';
}

function toggleAccordion(key) {
  const content = document.getElementById('acc-' + key);
  const icon    = document.getElementById('icon-' + key);
  if (!content) return;
  const isOpen = content.style.display !== 'none';
  content.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.textContent = isOpen ? '+' : '−';
}

// ============================================
// CARRITO — AGREGAR / QUITAR
// ============================================

function addToCart(id) {
  const product  = products.find(p => p.id === id);
  if (!product) return;
  const stockCount = product.stock !== undefined ? product.stock : 99;
  if (stockCount === 0) return;
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, img: product.imgs[0], qty: 1 });
  }

  saveCart();
  renderCart();
  showToast('✓ ' + product.name + ' añadido al carrito');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
  renderCart();
}

// ============================================
// CARRITO — RENDER
// ============================================

function renderCart() {
  const total    = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count    = cart.reduce((sum, item) => sum + item.qty, 0);
  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const countEl  = document.getElementById('cartCount');

  if (countEl) countEl.textContent = count;
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (footerEl) footerEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">
        <img src="${item.imgs ? item.imgs[0] : item.img}" alt="${item.name}" onerror="this.style.display='none'">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">S/ ${(item.price * item.qty).toLocaleString()}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
          <button onclick="changeQty(${item.id}, -1)" style="
            width:26px;height:26px;border-radius:4px;border:1px solid rgba(180,95,255,0.3);
            background:rgba(180,95,255,0.1);color:#b45fff;font-size:16px;cursor:pointer;
            display:flex;align-items:center;justify-content:center;line-height:1;
          ">−</button>
          <span style="font-size:14px;color:#f0eeff;min-width:16px;text-align:center;">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)" style="
            width:26px;height:26px;border-radius:4px;border:1px solid rgba(180,95,255,0.3);
            background:rgba(180,95,255,0.1);color:#b45fff;font-size:16px;cursor:pointer;
            display:flex;align-items:center;justify-content:center;line-height:1;
          ">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})" style="align-self:flex-start;">✕</button>
    </div>
  `).join('');

  if (footerEl) {
    // Obtener categorías en carrito para sugerir complementarios
    const cartCats    = [...new Set(cart.map(i => i.category))];
    const cartIds     = cart.map(i => i.id);
    const sugeridos   = products
      .filter(p => !cartIds.includes(p.id) && cartCats.includes(p.category))
      .slice(0, 2);
    const sugeridosExtra = sugeridos.length < 2
      ? products.filter(p => !cartIds.includes(p.id)).slice(0, 2 - sugeridos.length)
      : [];
    const todosRelacionados = [...sugeridos, ...sugeridosExtra].slice(0, 2);

    const relacionadosHTML = todosRelacionados.length > 0 ? `
      <div style="padding:14px 0;border-top:1px solid var(--glass-border);margin-top:4px;">
        <div style="font-size:10px;letter-spacing:2px;color:var(--neon-purple);text-transform:uppercase;margin-bottom:10px;">✦ Completa tu rutina</div>
        <div style="display:flex;gap:8px;">
          ${todosRelacionados.map(r => `
            <div style="flex:1;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);border-radius:6px;overflow:hidden;">
              <img src="${r.imgs ? r.imgs[0] : r.img}" alt="${r.name}" style="width:100%;height:60px;object-fit:cover;display:block;" onerror="this.style.display='none'">
              <div style="padding:8px;">
                <div style="font-size:11px;color:#f0eeff;margin-bottom:2px;line-height:1.3;">${r.name}</div>
                <div style="font-size:11px;color:#b45fff;margin-bottom:6px;">S/ ${r.price}</div>
                <button onclick="addToCart(${r.id})" style="
                  width:100%;background:rgba(180,95,255,0.15);
                  border:1px solid rgba(180,95,255,0.3);border-radius:3px;
                  padding:5px;color:#b45fff;font-family:'Rajdhani',sans-serif;
                  font-size:10px;letter-spacing:1px;cursor:pointer;
                ">+ Añadir</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    footerEl.innerHTML = `
      ${relacionadosHTML}
      <div class="cart-total">
        <span>Total</span>
        <span class="cart-total-amount">S/ ${total.toLocaleString()}</span>
      </div>
      <button class="checkout-btn" onclick="handleCheckout()">Finalizar Compra →</button>
    `;
  }
}

// ============================================
// CARRITO — ABRIR / CERRAR
// ============================================

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function handleCheckout() {
  if (cart.length === 0) { showToast('⚠️ Tu carrito está vacío'); return; }
  closeCart();
  window.location.href = 'checkout.html';
}

// ============================================
// TOAST
// ============================================

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
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
    cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px'; ring.style.top   = e.clientY + 'px';
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
    const h = Math.floor(rem / 3600), m = Math.floor((rem % 3600) / 60), s = rem % 60;
    const el = document.getElementById('countdown');
    const th = document.getElementById('t-h'), tm = document.getElementById('t-m'), ts = document.getElementById('t-s');
    if (el) el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    if (th) th.textContent = pad(h);
    if (tm) tm.textContent = pad(m);
    if (ts) ts.textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);
}

// ============================================
// SCROLL REVEAL
// ============================================

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function scrollToProducts() {
  const el = document.getElementById('productos');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// BUSCADOR
// ============================================

function initBuscador() {
  const nav = document.querySelector('nav');
  if (!nav || document.getElementById('searchBar')) return;

  const searchWrap = document.createElement('div');
  searchWrap.id = 'searchBar';
  searchWrap.style.cssText = 'position: relative; display: flex; align-items: center;';

  searchWrap.innerHTML = `
    <button id="searchToggle" onclick="toggleBuscadorMovil()" class="search-icon-btn" style="
      background: rgba(255,255,255,0.06); border: 1px solid rgba(180,95,255,0.2);
      width: 38px; height: 38px; border-radius: 50%; color: #b45fff;
      font-size: 16px; cursor: pointer; display: none; align-items: center; justify-content: center;
    ">🔍</button>

    <input type="text" id="searchInput" placeholder="🔍 Buscar producto..."
      class="search-desktop-input"
      style="
        background: rgba(255,255,255,0.06); border: 1px solid rgba(180,95,255,0.2);
        border-radius: 20px; padding: 8px 16px; color: #f0eeff;
        font-family: 'Rajdhani', sans-serif; font-size: 13px; outline: none;
        width: 200px; transition: border-color 0.3s, width 0.3s;
      "
      oninput="buscarProductos(this.value)"
      onfocus="this.style.borderColor='rgba(180,95,255,0.6)';this.style.width='260px'"
      onblur="this.style.borderColor='rgba(180,95,255,0.2)';this.style.width='200px';setTimeout(()=>cerrarBusqueda(),200)"
    />

    <div id="searchResults" style="
      position: absolute; top: 44px; left: 0; width: 300px;
      background: rgba(10,10,20,0.98); border: 1px solid rgba(180,95,255,0.3);
      border-radius: 8px; overflow: hidden; display: none; z-index: 200;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    "></div>

    <div id="searchDropdown" style="
      display: none; position: fixed; top: 58px; left: 0; right: 0;
      background: rgba(10,10,20,0.98); border-bottom: 1px solid rgba(180,95,255,0.3);
      padding: 12px 16px; z-index: 300; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    ">
      <input type="text" id="searchInputMobile" placeholder="Buscar producto..."
        style="
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(180,95,255,0.3); border-radius: 8px;
          padding: 12px 16px; color: #f0eeff;
          font-family: 'Rajdhani', sans-serif; font-size: 15px; outline: none;
          box-sizing: border-box;
        "
        oninput="buscarProductosMobile(this.value)"
      />
      <div id="searchResultsMobile" style="margin-top: 8px;"></div>
    </div>
  `;

  const cartBtn = nav.querySelector('.cart-btn');
  if (cartBtn) nav.insertBefore(searchWrap, cartBtn);
}

function toggleBuscadorMovil() {
  const dropdown = document.getElementById('searchDropdown');
  const input    = document.getElementById('searchInputMobile');
  if (!dropdown) return;
  const visible = dropdown.style.display !== 'none';
  dropdown.style.display = visible ? 'none' : 'block';
  if (!visible && input) setTimeout(() => input.focus(), 100);
}

function buscarProductosMobile(query) {
  const resultsEl = document.getElementById('searchResultsMobile');
  if (!resultsEl) return;
  const q = query.trim().toLowerCase();
  if (q.length < 2) { resultsEl.innerHTML = ''; return; }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 5);

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div style="padding:12px;text-align:center;color:rgba(240,238,255,0.4);font-size:13px;">Sin resultados</div>`;
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div onclick="document.getElementById('searchDropdown').style.display='none';openProductModal(${p.id})" style="
      display:flex;align-items:center;gap:12px;padding:10px;
      border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;
    ">
      <img src="${p.imgs[0]}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">
      <div style="flex:1;">
        <div style="font-size:14px;color:#f0eeff;font-family:'Rajdhani',sans-serif;">${p.name}</div>
        <div style="font-size:12px;color:rgba(240,238,255,0.4);">${p.desc}</div>
      </div>
      <div style="font-size:14px;color:#b45fff;font-weight:600;">S/ ${p.price}</div>
    </div>
  `).join('');
}

function buscarProductos(query) {
  const resultsEl = document.getElementById('searchResults');
  if (!resultsEl) return;

  const q = query.trim().toLowerCase();
  if (q.length < 2) { resultsEl.style.display = 'none'; return; }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 6);

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div style="padding:16px;text-align:center;color:rgba(240,238,255,0.4);font-size:13px;">Sin resultados para "${query}"</div>`;
    resultsEl.style.display = 'block';
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div onclick="cerrarBusqueda();openProductModal(${p.id})" style="
      display:flex;align-items:center;gap:12px;padding:10px 14px;
      border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;
      transition:background 0.2s;
    "
    onmouseover="this.style.background='rgba(180,95,255,0.08)'"
    onmouseout="this.style.background='none'">
      <img src="${p.imgs[0]}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">
      <div style="flex:1;">
        <div style="font-size:13px;color:#f0eeff;font-family:'Rajdhani',sans-serif;">${p.name}</div>
        <div style="font-size:12px;color:rgba(240,238,255,0.4);font-family:'Rajdhani',sans-serif;">${p.desc}</div>
      </div>
      <div style="font-size:13px;color:#b45fff;font-family:'Rajdhani',sans-serif;font-weight:600;">S/ ${p.price}</div>
    </div>
  `).join('') + `
    <div style="padding:10px 14px;text-align:center;font-size:12px;color:rgba(240,238,255,0.3);font-family:'Rajdhani',sans-serif;">
      ${matches.length} resultado${matches.length !== 1 ? 's' : ''}
    </div>
  `;

  resultsEl.style.display = 'block';
}

function cerrarBusqueda() {
  const resultsEl = document.getElementById('searchResults');
  const inputEl   = document.getElementById('searchInput');
  if (resultsEl) resultsEl.style.display = 'none';
  if (inputEl)   inputEl.value = '';
}

// ============================================
// ZOOM EN IMÁGENES (modal)
// ============================================

function initZoomImagen(imgSrc, productoNombre) {
  const prev = document.getElementById('zoomOverlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.id = 'zoomOverlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.95);
    display: flex; align-items: center; justify-content: center;
    cursor: zoom-out;
  `;

  overlay.innerHTML = `
    <button onclick="document.getElementById('zoomOverlay').remove()" style="
      position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.1);
      border:1px solid rgba(255,255,255,0.2);width:44px;height:44px;border-radius:50%;
      color:#fff;font-size:20px;cursor:pointer;z-index:10;
    ">✕</button>
    <img src="${imgSrc}" alt="${productoNombre}" style="
      max-width: 90vw; max-height: 90vh; object-fit: contain;
      border-radius: 4px;
    ">
  `;

  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/productos');
    if (res.ok) products = await res.json();
  } catch {}
  renderProducts();
  renderCart();
  initCursor();
  initCountdown();
  initScrollReveal();
  initBuscador();
});
