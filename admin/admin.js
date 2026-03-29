/* ===== D INDUSTRIALES - ADMIN JS ===== */

const STORAGE_KEY = 'dindustriales-gallery';
const SETTINGS_KEY = 'dindustriales-settings';
const SESSION_KEY = 'dindustriales-admin-session';
const ADMIN_PASS = 'dindustriales2025'; // Change this password!

// ── AUTH ───────────────────────────────────────────────────────
function checkSession() {
  if (sessionStorage.getItem(SESSION_KEY) === 'ok') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    initDashboard();
  }
}

function doLogin() {
  const pass = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginErr');
  const storedPass = localStorage.getItem('dindustriales-adminpass') || ADMIN_PASS;
  if (pass === storedPass) {
    sessionStorage.setItem(SESSION_KEY, 'ok');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    errEl.style.display = 'none';
    initDashboard();
  } else {
    errEl.style.display = 'block';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginPass').focus();
  }
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

// ── THEME ──────────────────────────────────────────────────────
function toggleAdminTheme() {
  const html = document.documentElement;
  const curr = html.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  document.getElementById('adminThemeBtn').innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('dindustriales-theme', next);
}

// Apply saved theme
(function () {
  const t = localStorage.getItem('dindustriales-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('adminThemeBtn');
  if (btn) btn.innerHTML = t === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
})();

// ── NAVIGATION ─────────────────────────────────────────────────
function showPage(name, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (pg) pg.classList.add('active');
  if (el) el.classList.add('active');
  else {
    document.querySelectorAll('.sidebar-item').forEach(i => {
      if (i.getAttribute('onclick') && i.getAttribute('onclick').includes(name)) i.classList.add('active');
    });
  }
  if (name === 'gallery') renderGalleryMgmt();
  if (name === 'settings') loadSettings();
}

// ── INIT ───────────────────────────────────────────────────────
function initDashboard() {
  updateStats();
  loadSettings();
}

function getGallery() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveGallery(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateStats();
}

function updateStats() {
  const items = getGallery();
  document.getElementById('totalPhotos').textContent = items.length;
  document.getElementById('beforeAfterCount').textContent = items.filter(i => i.phase === 'before' || i.phase === 'after').length;
  document.getElementById('projectCount').textContent = new Set(items.map(i => i.title)).size;
  // Estimate storage size
  const raw = localStorage.getItem(STORAGE_KEY) || '';
  const kb = (raw.length * 2 / 1024).toFixed(0);
  document.getElementById('storageUsed').textContent = kb > 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
}

// ── FILE UPLOAD ────────────────────────────────────────────────
let currentFile = null;
let currentDataUrl = null;

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) processFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.add('dragover');
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) processFile(file);
}

function processFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    showToast('Imagen demasiado grande. Máx 5MB.', 'error');
    return;
  }
  currentFile = file;
  const reader = new FileReader();
  reader.onload = function (e) {
    currentDataUrl = e.target.result;
    const strip = document.getElementById('previewStrip');
    strip.innerHTML = `
      <div class="preview-thumb">
        <img src="${currentDataUrl}" alt="preview" />
        <button class="rm" onclick="clearPreview()">×</button>
      </div>`;
    document.getElementById('uploadFields').style.display = 'grid';
    document.getElementById('btnSave').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function clearPreview() {
  currentFile = null; currentDataUrl = null;
  document.getElementById('previewStrip').innerHTML = '';
  document.getElementById('uploadFields').style.display = 'none';
  document.getElementById('btnSave').style.display = 'none';
  document.getElementById('fileInput').value = '';
}

function savePhoto() {
  if (!currentDataUrl) { showToast('Selecciona una imagen primero', 'error'); return; }
  const title = document.getElementById('photoTitle').value.trim();
  if (!title) { showToast('El título es requerido', 'error'); return; }

  const item = {
    id: Date.now(),
    src: currentDataUrl,
    title: title,
    type: document.getElementById('photoType').value,
    location: document.getElementById('photoLocation').value.trim(),
    phase: document.getElementById('photoPhase').value,
    description: document.getElementById('photoDesc').value.trim(),
    date: new Date().toLocaleDateString('es-PR'),
  };

  const gallery = getGallery();
  gallery.unshift(item);
  saveGallery(gallery);
  showToast('✅ Foto guardada exitosamente en la galería');
  clearPreview();
  document.getElementById('photoTitle').value = '';
  document.getElementById('photoDesc').value = '';
  document.getElementById('photoLocation').value = '';
}

// ── GALLERY MANAGEMENT ─────────────────────────────────────────
function renderGalleryMgmt() {
  const items = getGallery();
  const container = document.getElementById('galleryMgmt');
  if (items.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i><h3>No hay fotos aún</h3><p>Ve a "Subir Fotos" para añadir imágenes a la galería.</p></div>';
    return;
  }
  container.innerHTML = `<div class="gallery-mgmt-grid">${items.map(item => `
    <div class="gallery-mgmt-card">
      <span class="gallery-badge-sm">${item.type || 'Restauración'}</span>
      <img src="${item.src}" alt="${item.title}" />
      <div class="gallery-mgmt-info">
        <h4>${item.title}</h4>
        <p>${item.location || 'Puerto Rico'} · ${item.date || ''}</p>
        <p style="margin-top:4px;color:var(--text2);">${item.phase === 'before' ? '📷 Antes' : item.phase === 'after' ? '✅ Después' : '🔄 Durante'}</p>
        <div class="gallery-mgmt-actions">
          <button class="btn-del" onclick="deletePhoto(${item.id})"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>`).join('')}
  </div>`;
}

function deletePhoto(id) {
  if (!confirm('¿Eliminar esta foto de la galería?')) return;
  const gallery = getGallery().filter(i => i.id !== id);
  saveGallery(gallery);
  renderGalleryMgmt();
  showToast('Foto eliminada');
}

function clearGallery() {
  saveGallery([]);
  renderGalleryMgmt();
  showToast('Galería borrada');
}

// ── SETTINGS ───────────────────────────────────────────────────
function loadSettings() {
  const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('sPhone', s.phone);
  set('sWhatsApp', s.whatsapp);
  set('sEmail', s.email);
  set('sLocation', s.location);
  set('sWaMsg', s.waMsg);
}

function saveSettings() {
  const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const s = { phone: get('sPhone'), whatsapp: get('sWhatsApp'), email: get('sEmail'), location: get('sLocation'), waMsg: get('sWaMsg') };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  showToast('✅ Configuración guardada');
}

// ── EXPORT/IMPORT ──────────────────────────────────────────────
function exportData() {
  const data = { gallery: getGallery(), settings: JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'), exported: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `dindustriales-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showToast('Datos exportados');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.gallery) saveGallery(data.gallery);
      if (data.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      showToast(`✅ ${data.gallery?.length || 0} fotos importadas`);
      renderGalleryMgmt();
    } catch { showToast('Error al importar el archivo', 'error'); }
  };
  reader.readAsText(file);
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  toast.style.background = type === 'error' ? '#ef4444' : '#22c55e';
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Init
checkSession();

