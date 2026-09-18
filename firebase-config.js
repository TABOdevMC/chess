// Firebase Web configuration for chess-tabo.
// This config is safe to include in a client-side app. Never put service-account
// private keys or other server credentials in this file.
window.CHESS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyALaTwV2INz5UzLjip_Sw2NRsHfU7TcvII",
  authDomain: "chess-tabo.firebaseapp.com",
  projectId: "chess-tabo",
  storageBucket: "chess-tabo.firebasestorage.app",
  messagingSenderId: "332045219989",
  appId: "1:332045219989:web:8117cf83f64820df27c39c"
};

// Responsive layout patch. firebase-config.js is loaded before the UI is built,
// so this also fixes the puzzle board when the main stylesheet is cached.
(function () {
  var style = document.createElement('style');
  style.id = 'chess-responsive-fix';
  style.textContent = `
    .layout, .analysis-layout { min-width: 0; grid-template-columns: minmax(0, 1fr) 350px; }
    .layout > *, .analysis-layout > *, .card { min-width: 0; }
    .board { width: min(100%, 700px); max-width: 100%; min-width: 0; }
    #puzzles .board { width: min(100%, 700px); max-width: 100%; }
    @media (max-width: 900px) {
      .layout, .analysis-layout { grid-template-columns: minmax(0, 1fr); }
      .board, #puzzles .board { width: min(94vw, 700px); max-width: 100%; }
    }
    @media (max-width: 520px) {
      .board, #puzzles .board { width: 100%; }
    }
  `;
  document.head.appendChild(style);
})();
