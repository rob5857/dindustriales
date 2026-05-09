// ===== FIREBASE CONFIGURATION — Desarrollos Industriales LLC =====

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore }  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getStorage }    from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const firebaseConfig = {
  apiKey:            "AIzaSyAx01yX-dHxqSr53VJLodjdI09Ac2tOB9c",
  authDomain:        "desarrollosindustrialesllc.firebaseapp.com",
  databaseURL:       "https://desarrollosindustrialesllc-default-rtdb.firebaseio.com",
  projectId:         "desarrollosindustrialesllc",
  storageBucket:     "desarrollosindustrialesllc.firebasestorage.app",
  messagingSenderId: "718687155766",
  appId:             "1:718687155766:web:ed8a4bd7adda9f4168ca97",
  measurementId:     "G-LKE82HQT13"
};

const app = initializeApp(firebaseConfig);
export const db      = getFirestore(app);
export const storage = getStorage(app);
export const TESTIMONIALS_COLLECTION = 'testimonials';
