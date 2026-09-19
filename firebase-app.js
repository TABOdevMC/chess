(function(){'use strict';
function load(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
async function start(){try{if(!window.CHESS_FIREBASE_CONFIG)await load('./firebase-config.js');await load('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');await load('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js');await load('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js');if(!firebase.apps.length)firebase.initializeApp(window.CHESS_FIREBASE_CONFIG);var auth=firebase.auth(),db=firebase.firestore();window.chessFirebase={auth:auth,db:db,ready:true};
await load('./matchmaking.js');if(window.initChessMatchmaking)window.initChessMatchmaking(auth,db);
await load('./admin.js');if(window.initChessAdmin)window.initChessAdmin(auth,db);
await load('./leaderboard.js');if(window.initChessLeaderboard)window.initChessLeaderboard(auth,db);
window.dispatchEvent(new CustomEvent('chess-firebase-ready'));
}catch(e){console.error('Firebase:',e);window.chessFirebase={ready:false,error:e};window.dispatchEvent(new CustomEvent('chess-firebase-error',{detail:e}));}}
start();})();
