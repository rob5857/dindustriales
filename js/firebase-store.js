/* ===== FIREBASE STORE =======================================================
 * Capa fina sobre Firebase Auth + Realtime Database.
 * Expone window.fbStore con métodos que devuelven Promises.
 *
 * Si Firebase no está configurado (valores YOUR_* en firebase-config.js) o el
 * SDK no cargó, isConfigured() devuelve false y el resto de métodos resuelven
 * en null/false sin hacer llamadas de red — así el sitio sigue funcionando
 * normalmente con localStorage.
 * ========================================================================== */
(function () {
  var cfg = window.FIREBASE_CONFIG || {};
  var hasPlaceholder = !cfg.apiKey
    || cfg.apiKey.indexOf('YOUR_') === 0
    || cfg.apiKey === 'YOUR_API_KEY_HERE';
  var CONFIGURED = !hasPlaceholder && typeof firebase !== 'undefined';

  function ensureApp() {
    if (!CONFIGURED) return null;
    try {
      if (firebase.apps && firebase.apps.length) return firebase.apps[0];
      return firebase.initializeApp(cfg);
    } catch (err) {
      console.error('[fbStore] initializeApp falló:', err);
      return null;
    }
  }

  window.fbStore = {
    isConfigured: function () { return !!CONFIGURED; },

    signIn: function (password) {
      if (!CONFIGURED || !ensureApp()) return Promise.reject(new Error('Firebase no configurado'));
      var email = window.FIREBASE_ADMIN_EMAIL || 'admin@example.com';
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signOut: function () {
      if (!CONFIGURED || !ensureApp()) return Promise.resolve();
      return firebase.auth().signOut();
    },

    currentUser: function () {
      if (!CONFIGURED || !ensureApp()) return null;
      return firebase.auth().currentUser;
    },

    save: function (path, data) {
      if (!CONFIGURED || !ensureApp()) return Promise.resolve(false);
      return firebase.database().ref(path).set(data).then(function () { return true; });
    },

    load: function (path) {
      if (!CONFIGURED || !ensureApp()) return Promise.resolve(null);
      return firebase.database().ref(path).once('value').then(function (snap) { return snap.val(); });
    },

    onAuthChange: function (cb) {
      if (!CONFIGURED || !ensureApp()) return function () {};
      return firebase.auth().onAuthStateChanged(cb);
    },

    // ── STORAGE ────────────────────────────────────────────────
    hasStorage: function () {
      return !!(CONFIGURED && ensureApp() && typeof firebase.storage === 'function');
    },

    uploadImage: function (path, blob, contentType) {
      if (!this.hasStorage()) return Promise.reject(new Error('Firebase Storage no disponible'));
      var ref = firebase.storage().ref().child(path);
      var meta = { contentType: contentType || (blob && blob.type) || 'image/jpeg', cacheControl: 'public,max-age=31536000' };
      return ref.put(blob, meta).then(function (snap) { return snap.ref.getDownloadURL(); });
    },

    deleteImage: function (urlOrPath) {
      if (!this.hasStorage() || !urlOrPath) return Promise.resolve(false);
      try {
        var ref = urlOrPath.indexOf('http') === 0
          ? firebase.storage().refFromURL(urlOrPath)
          : firebase.storage().ref().child(urlOrPath);
        return ref.delete().then(function () { return true; }).catch(function () { return false; });
      } catch (err) {
        return Promise.resolve(false);
      }
    }
  };
})();
