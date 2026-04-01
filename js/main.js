/* ===== D INDUSTRIALES - MAIN JS ===== */

// ── THEME TOGGLE ──────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('dindustriales-theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('dindustriales-theme') || 'dark';
applyTheme(savedTheme);

// ── HAMBURGER MENU ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  navMenu.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden'; // evita scroll del fondo
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Cerrar al hacer clic en un link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Cerrar al hacer clic en el overlay (pseudo-element ::before)
navMenu.addEventListener('click', (e) => {
  if (e.target === navMenu) closeMenu();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

// ── HEADER SCROLL ─────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── FIRE CANVAS ANIMATION ──────────────────────────────────────
(function initFireCanvas() {
  const canvas = document.getElementById('fireCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    'rgba(255,60,0,',
    'rgba(255,130,30,',
    'rgba(255,200,50,',
    'rgba(230,50,20,',
    'rgba(255,100,10,',
    'rgba(255,80,0,'
  ];

  function Particle() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = H + Math.random() * 80;
      this.size = Math.random() * 18 + 4;
      this.speedY = -(Math.random() * 2.5 + 0.8);
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.life = 1;
      this.decay = Math.random() * 0.012 + 0.006;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.06 + 0.02;
    };
    this.reset();

    this.update = function () {
      this.life -= this.decay;
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.size *= 0.993;
      if (this.life <= 0 || this.y < -this.size) this.reset();
    };

    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, this.color + '1)');
      grad.addColorStop(0.5, this.color + '0.6)');
      grad.addColorStop(1, this.color + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  }

  // Create particles
  for (let i = 0; i < 220; i++) {
    const p = new Particle();
    p.y = Math.random() * H; // spread initial positions
    particles.push(p);
  }

  // Also add ember/spark particles
  function Ember() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = H * 0.7 + Math.random() * H * 0.3;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 3 + 1);
      this.speedX = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = Math.random() * 0.008 + 0.004;
    };
    this.reset();
    this.update = function () {
      this.life -= this.decay;
      this.y += this.speedY;
      this.x += this.speedX;
      this.speedX += (Math.random() - 0.5) * 0.15;
      if (this.life <= 0 || this.y < -10) this.reset();
    };
    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * 0.9);
      ctx.fillStyle = '#ffd60a';
      ctx.shadowColor = '#ff6b35';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  }

  for (let i = 0; i < 80; i++) {
    const e = new Ember();
    e.y = Math.random() * H;
    particles.push(e);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── COUNTER ANIMATION ──────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counter when stats section is visible
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } });
}, { threshold: 0.5 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObs.observe(statsSection);

// ── FIRE RADAR MAP (Leaflet + NASA FIRMS) ─────────────────────
function initFireMap() {
  const mapEl = document.getElementById('fireMap');
  if (!mapEl) return;

  // Center on Puerto Rico
  const map = L.map('fireMap', {
    center: [18.22, -66.59],
    zoom: 9,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  // Base tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // FIRMS VIIRS NRT WMS overlay (no API key needed for WMS tiles)
  const firmsUrl = 'https://firms.modaps.eosdis.nasa.gov/wms/key/1/';
  const firmsLayer = L.tileLayer.wms(firmsUrl, {
    layers: 'fires_viirs_snpp',
    format: 'image/png',
    transparent: true,
    opacity: 0.85,
    attribution: 'NASA FIRMS'
  });

  // Try to load FIRMS, fallback gracefully
  firmsLayer.on('tileerror', () => {
    document.getElementById('radarStatusText').textContent = 'Cargando desde base alternativa...';
  });
  firmsLayer.addTo(map);

  // Fetch fire hotspot data from NASA FIRMS JSON API (CORS proxy)
  const today = new Date().toISOString().split('T')[0];
  const statusEl = document.getElementById('radarStatusText');
  const timeEl = document.getElementById('radarTime');

  // Use NASA FIRMS public REST API (map key required – fallback to manual markers if unavailable)
  const FIRMS_MAP_KEY = 'yourkey'; // Replace with a free key from https://firms.modaps.eosdis.nasa.gov/api/
  const firmsApiUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/json/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/-68,17,-65,19/2`;

  fetch(firmsApiUrl)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => {
      if (!data || !data.length) throw new Error('No data');
      const fireIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;background:radial-gradient(circle,#ffd60a,#ff4500);border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px #ff4500;"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      data.forEach(point => {
        const brightness = parseFloat(point.bright_ti4 || 300);
        const color = brightness > 350 ? '#ef4444' : brightness > 330 ? '#f97316' : '#eab308';
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:12px;height:12px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px ${color};animation:radarPulse 2s infinite;"></div>`,
          iconSize: [12, 12], iconAnchor: [6, 6]
        });
        L.marker([parseFloat(point.latitude), parseFloat(point.longitude)], { icon })
          .addTo(map)
          .bindPopup(`<b>Foco de Calor</b><br/>Brillo: ${brightness}K<br/>Fecha: ${point.acq_date}<br/>Satélite: VIIRS`);
      });
      statusEl.textContent = `${data.length} focos de calor activos detectados`;
      timeEl.textContent = new Date().toLocaleString('es-PR');
    })
    .catch(() => {
      // Graceful fallback: show static known fire risk areas in PR
      statusEl.textContent = 'Mapa activo – datos satelitales actualizados cada 12h';
      timeEl.textContent = new Date().toLocaleString('es-PR');
      const zones = [
        { lat: 18.01, lng: -66.61, name: 'Bosque Toro Negro', risk: 'Área de riesgo monitoreada' },
        { lat: 18.47, lng: -66.73, name: 'Aguadilla', risk: 'Área costera monitoreada' },
        { lat: 18.09, lng: -65.83, name: 'Humacao', risk: 'Área este monitoreada' },
        { lat: 18.35, lng: -66.11, name: 'Caguas', risk: 'Área central monitoreada' },
      ];
      zones.forEach(z => {
        L.circleMarker([z.lat, z.lng], {
          radius: 10, color: '#ff6b35', fillColor: '#ff6b35', fillOpacity: 0.3,
          weight: 2, dashArray: '4'
        }).addTo(map).bindPopup(`<b>${z.name}</b><br/>${z.risk}`);
      });
    });

  // Add PR boundary highlight
  L.rectangle([[17.9, -67.3], [18.55, -65.6]], {
    color: '#4ecdc4', weight: 2, fill: false, dashArray: '6'
  }).addTo(map).bindPopup('<b>Puerto Rico</b><br/>Zona de monitoreo activo');
}

document.addEventListener('DOMContentLoaded', () => {
  // Init AOS
  AOS.init({ duration: 800, once: true, offset: 80 });
  // Init map
  initFireMap();
});

// ── CONTACT FORM ───────────────────────────────────────────────
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const submitBtn = form.querySelector('[type="submit"]');
  const successEl = document.getElementById('formSuccess');

  // Disable button while sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  // Build FormData payload for FormSubmit.co
  const payload = new FormData();
  payload.append('nombre',      data.nombre);
  payload.append('telefono',    data.telefono);
  payload.append('email',       data.email || 'No proporcionado');
  payload.append('direccion',   data.direccion);
  payload.append('aseguradora', data.aseguradora || 'No especificada');
  payload.append('descripcion', data.descripcion);
  // FormSubmit.co special fields
  payload.append('_subject',    `Nueva Solicitud de Inspección – ${data.nombre}`);
  payload.append('_cc',         'info@desarrollosindustriales.com');
  payload.append('_captcha',    'false');
  payload.append('_template',   'table');

  // Send to FormSubmit (primary address)
  fetch('https://formsubmit.co/ajax/dindustriales@gmail.com', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: payload
  })
  .then(res => res.json())
  .then(res => {
    if (res.success === 'true' || res.success === true) {
      // Show success message
      successEl.style.display = 'flex';
      form.reset();
      // Also notify via WhatsApp (background tab)
      const msg = encodeURIComponent(
        `*Nueva Solicitud - D Industriales*\n` +
        `Nombre: ${data.nombre}\n` +
        `Teléfono: ${data.telefono}\n` +
        `Email: ${data.email || 'N/A'}\n` +
        `Dirección: ${data.direccion}\n` +
        `Aseguradora: ${data.aseguradora || 'No especificada'}\n` +
        `Descripción: ${data.descripcion}`
      );
      window.open(`https://wa.me/19733920478?text=${msg}`, '_blank');
    } else {
      throw new Error('FormSubmit returned failure');
    }
  })
  .catch(() => {
    // Fallback: WhatsApp + alert
    alert('Hubo un problema al enviar el formulario. Le redirigiremos a WhatsApp.');
    const msg = encodeURIComponent(
      `*Nueva Solicitud - D Industriales*\nNombre: ${data.nombre}\nTeléfono: ${data.telefono}\nDirección: ${data.direccion}\nDescripción: ${data.descripcion}`
    );
    window.open(`https://wa.me/19733920478?text=${msg}`, '_blank');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitud';
  });
}

// ── GALLERY LOADER (from localStorage - admin managed) ────────
function loadGallery() {
  const items = JSON.parse(localStorage.getItem('dindustriales-gallery') || '[]');
  const container = document.getElementById('galleryItems');
  const placeholders = document.getElementById('galleryGrid');
  if (!container) return;

  if (items.length > 0) {
    placeholders.style.display = 'none';
    container.innerHTML = items.map((item, i) => `
      <div class="gallery-item" onclick="openLightbox('${item.after || item.src}')">
        <img src="${item.src}" alt="${item.title || 'Proyecto ' + (i+1)}" loading="lazy" />
        <div class="gallery-badge">${item.type || 'Restauración'}</div>
        <div class="gallery-item-overlay">
          <h4>${item.title || 'Proyecto de Restauración'}</h4>
          <p>${item.description || 'Puerto Rico'}</p>
        </div>
      </div>
    `).join('');
  }
}

// ── LIGHTBOX ───────────────────────────────────────────────────
function openLightbox(src) {
  let lb = document.querySelector('.lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" onclick="closeLightbox()">&times;</button><img />';
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.querySelector('.lightbox');
  if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

loadGallery();

// Formulario colapsable y reveal de teléfonos gestionados en index.html (inline script)
