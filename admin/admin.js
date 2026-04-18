/* ===== D INDUSTRIALES - ADMIN JS ===== */

const STORAGE_KEY = 'dindustriales-gallery';
const BA_KEY = 'dindustriales-beforeafter';
const SETTINGS_KEY = 'dindustriales-settings';
const SESSION_KEY = 'dindustriales-admin-session';
const ADMIN_PASS = 'dindustriales2025'; // Change this password!

// ── AUTH ───────────────────────────────────────────────────────
function fbReady() { return window.fbStore && window.fbStore.isConfigured(); }

function checkSession() {
  if (sessionStorage.getItem(SESSION_KEY) === 'ok') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    initDashboard();
  }
}

function finishLogin() {
  sessionStorage.setItem(SESSION_KEY, 'ok');
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('loginErr').style.display = 'none';
  initDashboard();
}

function showLoginError(msg) {
  const errEl = document.getElementById('loginErr');
  if (msg) errEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + msg;
  errEl.style.display = 'block';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginPass').focus();
}

function doLogin() {
  const pass = document.getElementById('loginPass').value;
  const storedPass = localStorage.getItem('dindustriales-adminpass') || ADMIN_PASS;

  // Con Firebase configurado, la contraseña debe ser la del usuario de Firebase.
  if (fbReady()) {
    window.fbStore.signIn(pass)
      .then(finishLogin)
      .catch(function (err) {
        console.error('[admin] Firebase signIn falló:', err);
        showLoginError('Contraseña incorrecta (Firebase)');
      });
    return;
  }

  if (pass === storedPass) finishLogin();
  else showLoginError();
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  if (fbReady()) {
    window.fbStore.signOut().finally(function () { location.reload(); });
  } else {
    location.reload();
  }
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
  if (name === 'beforeafter') renderBAList();
  if (name === 'settings') { loadSettings(); updateFbBadge(); }
  // Cerrar el menú automáticamente en móvil al navegar
  if (window.innerWidth <= 900) closeAdminMenu();
  // Volver al tope de la página al cambiar de sección
  const main = document.querySelector('.main-content');
  if (main) main.scrollTop = 0;
  window.scrollTo(0, 0);
}

// ── MOBILE MENU ────────────────────────────────────────────────
function toggleAdminMenu() {
  const sidebar = document.getElementById('adminSidebar');
  const burger = document.getElementById('adminHamburger');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  if (burger) burger.classList.toggle('active', isOpen);
  if (backdrop) backdrop.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeAdminMenu() {
  const sidebar = document.getElementById('adminSidebar');
  const burger = document.getElementById('adminHamburger');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (burger) burger.classList.remove('active');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar con ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAdminMenu();
});

// ── INIT ───────────────────────────────────────────────────────
function initDashboard() {
  updateStats();
  loadSettings();
  updateFbBadge();
  if (fbReady()) pullFromFirebase();
}

function updateFbBadge() {
  const badge = document.getElementById('fbStatusBadge');
  const text = document.getElementById('fbStatusText');
  if (!badge || !text) return;
  if (fbReady()) {
    badge.classList.remove('off'); badge.classList.add('on');
    text.textContent = 'Conectado';
  } else {
    badge.classList.remove('on'); badge.classList.add('off');
    text.textContent = 'No configurado';
  }
}

function pullFromFirebase() {
  Promise.all([
    window.fbStore.load('beforeafter'),
    window.fbStore.load('gallery')
  ]).then(function (results) {
    const remotePairs = results[0];
    const remoteGallery = results[1];
    let changed = false;
    if (Array.isArray(remotePairs)) {
      localStorage.setItem(BA_KEY, JSON.stringify(remotePairs));
      changed = true;
    }
    if (Array.isArray(remoteGallery)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteGallery));
      changed = true;
    }
    if (changed) {
      updateStats();
      renderBAList();
      renderGalleryMgmt();
    }
  }).catch(function (err) { console.error('[admin] pullFromFirebase:', err); });
}

function pushToFirebase(path, data) {
  if (!fbReady()) return;
  window.fbStore.save(path, data).catch(function (err) {
    console.error('[admin] pushToFirebase:', err);
    showToast('⚠ No se sincronizó en la nube (ver consola)', 'error');
  });
}

function getGallery() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveGallery(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateStats();
  pushToFirebase('gallery', data);
}

function updateStats() {
  const items = getGallery();
  const pairs = getBAPairs();
  document.getElementById('totalPhotos').textContent = items.length + pairs.length * 2;
  document.getElementById('beforeAfterCount').textContent = pairs.length;
  document.getElementById('projectCount').textContent = new Set([...items.map(i => i.title), ...pairs.map(p => p.title)].filter(Boolean)).size;
  // Estimate storage size
  const raw = (localStorage.getItem(STORAGE_KEY) || '') + (localStorage.getItem(BA_KEY) || '');
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

// ── BEFORE / AFTER PAIRS ───────────────────────────────────────
function getBAPairs() { return JSON.parse(localStorage.getItem(BA_KEY) || '[]'); }
function saveBAPairs(data) {
  localStorage.setItem(BA_KEY, JSON.stringify(data));
  updateStats();
  pushToFirebase('beforeafter', data);
}

let baBefore = null, baAfter = null;

function baDragOver(event, which) {
  event.preventDefault();
  document.getElementById(which === 'before' ? 'baDropBefore' : 'baDropAfter').classList.add('dragover');
}

function baDrop(event, which) {
  event.preventDefault();
  document.getElementById(which === 'before' ? 'baDropBefore' : 'baDropAfter').classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) baProcessFile(file, which);
}

function baSelect(event, which) {
  const file = event.target.files[0];
  if (file) baProcessFile(file, which);
}

function baProcessFile(file, which) {
  if (file.size > 5 * 1024 * 1024) { showToast('Imagen demasiado grande. Máx 5MB.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    if (which === 'before') baBefore = dataUrl; else baAfter = dataUrl;
    const prev = document.getElementById(which === 'before' ? 'baPrevBefore' : 'baPrevAfter');
    prev.innerHTML = `
      <div class="preview-thumb">
        <img src="${dataUrl}" alt="preview" />
        <button class="rm" onclick="baClearPreview('${which}')">×</button>
      </div>`;
  };
  reader.readAsDataURL(file);
}

function baClearPreview(which) {
  if (which === 'before') {
    baBefore = null;
    document.getElementById('baPrevBefore').innerHTML = '';
    document.getElementById('baFileBefore').value = '';
  } else {
    baAfter = null;
    document.getElementById('baPrevAfter').innerHTML = '';
    document.getElementById('baFileAfter').value = '';
  }
}

function baSave() {
  if (!baBefore || !baAfter) { showToast('Sube las dos imágenes (antes y después)', 'error'); return; }
  const pair = {
    id: Date.now(),
    before: baBefore,
    after: baAfter,
    title: document.getElementById('baTitle').value.trim(),
    location: document.getElementById('baLocation').value.trim(),
    description: document.getElementById('baDesc').value.trim(),
    date: new Date().toLocaleDateString('es-PR'),
  };
  try {
    const list = getBAPairs();
    list.unshift(pair);
    saveBAPairs(list);
  } catch (err) {
    showToast('Error al guardar: espacio de almacenamiento lleno', 'error');
    return;
  }
  showToast('✅ Par guardado en la galería');
  baClearPreview('before');
  baClearPreview('after');
  document.getElementById('baTitle').value = '';
  document.getElementById('baLocation').value = '';
  document.getElementById('baDesc').value = '';
  renderBAList();
}

function renderBAList() {
  const list = getBAPairs();
  const el = document.getElementById('baList');
  if (!el) return;
  if (list.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-sliders-h"></i><h3>No hay pares aún</h3><p>Sube una imagen "antes" y su "después" para añadir tu primer par al comparador.</p></div>';
    return;
  }
  el.innerHTML = `<div class="ba-pair-grid">${list.map((p, i) => `
    <div class="ba-pair-card">
      <div class="ba-pair-imgs">
        <div data-label="ANTES"><img src="${p.before}" alt="Antes" /></div>
        <div data-label="DESPUÉS"><img src="${p.after}" alt="Después" /></div>
      </div>
      <div class="ba-pair-info">
        <h4>${p.title || 'Sin título'}</h4>
        <p>${p.location || 'Puerto Rico'} · ${p.date || ''} · <span style="color:var(--orange);font-weight:700;">#${i + 1}</span></p>
        ${p.description ? `<p style="margin-top:6px;">${p.description}</p>` : ''}
        <div class="ba-pair-actions">
          <button class="btn-icon" onclick="baMove(${p.id}, -1)" ${i === 0 ? 'disabled' : ''} title="Subir"><i class="fas fa-arrow-up"></i></button>
          <button class="btn-icon" onclick="baMove(${p.id}, 1)" ${i === list.length - 1 ? 'disabled' : ''} title="Bajar"><i class="fas fa-arrow-down"></i></button>
          <button class="btn-icon" onclick="baEdit(${p.id})"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-del" onclick="baDelete(${p.id})"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

function baDelete(id) {
  if (!confirm('¿Eliminar este par de la galería?')) return;
  saveBAPairs(getBAPairs().filter(p => p.id !== id));
  renderBAList();
  showToast('Par eliminado');
}

function baMove(id, direction) {
  const list = getBAPairs();
  const idx = list.findIndex(p => p.id === id);
  if (idx < 0) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= list.length) return;
  const [item] = list.splice(idx, 1);
  list.splice(newIdx, 0, item);
  saveBAPairs(list);
  renderBAList();
}

// ── EDIT MODAL ─────────────────────────────────────────────────
let baEditingId = null;
let baEditBefore = null;
let baEditAfter = null;

function baEdit(id) {
  const pair = getBAPairs().find(p => p.id === id);
  if (!pair) return;
  baEditingId = id;
  baEditBefore = pair.before;
  baEditAfter = pair.after;
  document.getElementById('editBeforeImg').src = pair.before;
  document.getElementById('editAfterImg').src = pair.after;
  document.getElementById('editTitle').value = pair.title || '';
  document.getElementById('editLocation').value = pair.location || '';
  document.getElementById('editDesc').value = pair.description || '';
  document.getElementById('editFileBefore').value = '';
  document.getElementById('editFileAfter').value = '';
  document.getElementById('baEditModal').classList.add('show');
}

function baEditClose() {
  document.getElementById('baEditModal').classList.remove('show');
  baEditingId = null; baEditBefore = null; baEditAfter = null;
}

function baEditSelect(event, which) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Imagen demasiado grande. Máx 5MB.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    if (which === 'before') {
      baEditBefore = dataUrl;
      document.getElementById('editBeforeImg').src = dataUrl;
    } else {
      baEditAfter = dataUrl;
      document.getElementById('editAfterImg').src = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

function baEditSave() {
  if (baEditingId == null) return;
  const list = getBAPairs();
  const idx = list.findIndex(p => p.id === baEditingId);
  if (idx < 0) { baEditClose(); return; }
  list[idx] = {
    ...list[idx],
    before: baEditBefore || list[idx].before,
    after: baEditAfter || list[idx].after,
    title: document.getElementById('editTitle').value.trim(),
    location: document.getElementById('editLocation').value.trim(),
    description: document.getElementById('editDesc').value.trim(),
  };
  try {
    saveBAPairs(list);
  } catch (err) {
    showToast('Error al guardar: espacio de almacenamiento lleno', 'error');
    return;
  }
  showToast('✅ Cambios guardados');
  baEditClose();
  renderBAList();
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
  const data = {
    gallery: getGallery(),
    beforeafter: getBAPairs(),
    settings: JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'),
    exported: new Date().toISOString()
  };
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
      if (data.beforeafter) saveBAPairs(data.beforeafter);
      if (data.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      const n = (data.gallery?.length || 0) + (data.beforeafter?.length || 0);
      showToast(`✅ ${n} elementos importados`);
      renderGalleryMgmt();
      renderBAList();
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

