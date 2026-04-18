/* ===== FIREBASE CONFIG ======================================================
 * Configuración de Firebase para sincronizar la galería Antes/Después
 * entre todos los visitantes del sitio. Esta capa es OPCIONAL — si dejas los
 * valores por defecto (YOUR_*), el sitio sigue funcionando con localStorage.
 *
 * CÓMO CONFIGURARLO:
 *   1) Crea un proyecto en https://console.firebase.google.com/
 *   2) Activa "Realtime Database" (modo test o con reglas personalizadas).
 *   3) Activa "Authentication" → método "Correo electrónico/Contraseña"
 *      y crea un usuario admin (ej: admin@dindustriales.com).
 *   4) En Configuración del proyecto → Tus apps (web), copia los valores
 *      del objeto firebaseConfig y pégalos abajo.
 *   5) Pon abajo el email del usuario admin que creaste en el paso 3.
 *   6) Sube los cambios al hosting. La contraseña que usas para entrar al
 *      panel admin ahora será la contraseña del usuario de Firebase.
 *
 * REGLAS RECOMENDADAS para Realtime Database:
 *   {
 *     "rules": {
 *       ".read": true,
 *       "beforeafter": { ".write": "auth != null" },
 *       "gallery":     { ".write": "auth != null" }
 *     }
 *   }
 * ========================================================================== */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAx01yX-dHxqSr53VJLodjdI09Ac2tOB9c",
  authDomain: "desarrollosindustrialesllc.firebaseapp.com",
  databaseURL: "https://desarrollosindustrialesllc-default-rtdb.firebaseio.com",
  projectId: "desarrollosindustrialesllc",
  storageBucket: "desarrollosindustrialesllc.firebasestorage.app",
  messagingSenderId: "718687155766",
  appId: "1:718687155766:web:ed8a4bd7adda9f4168ca97",
  measurementId: "G-LKE82HQT13"
};

// Email del usuario admin creado en Firebase Authentication.
window.FIREBASE_ADMIN_EMAIL = "admin@dindustriales.com";
