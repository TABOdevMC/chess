/* Stockfish 19 lite single-threaded loader for GitHub Pages. */
(function(){'use strict';
  const ENGINE_URL='https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-lite-single.js';
  let worker=null, ready=null, busy=false;
  const api={_initialized:false,_resolve:null,_reject:null};
  function create(){
    if(worker) return ready;
    ready=new Promise(function(resolve,reject){
      try{ worker=new Worker(ENGINE_URL); }catch(e){ reject(e); return; }
      worker.onmessage=function(e){
        const line=typeof e.data==='string'?e.data:'';
        if(line==='uciok') resolve(api);
        if(line.indexOf('bestmove ')===0){
          busy=false;
          const move=line.split(/\s+/)[1];
          if(api._resolve){const r=api._resolve;api._resolve=null;r(move);}
        }
      };
      worker.onerror=function(e){
        if(api._reject){const r=api._reject;api._reject=null;r(e);}
        else if(!api._initialized) reject(e);
      };
      worker.postMessage('uci');
    });
    return ready;
  }
  api.init=function(){return create().then(function(){api._initialized=true;worker.postMessage('isready');return api;});};
  api.stop=function(){if(worker)worker.postMessage('stop');busy=false;};
  api.quit=function(){if(worker){worker.postMessage('quit');worker.terminate();worker=null;ready=null;}api._initialized=false;};
  api.bestMove=function(fen,depth){
    return api.init().then(function(){
      if(busy) api.stop();
      busy=true;
      return new Promise(function(resolve,reject){
        api._resolve=resolve;api._reject=reject;
        worker.postMessage('position fen '+fen);
        worker.postMessage('go depth '+Math.max(1,Math.min(12,depth||3)));
      });
    });
  };
  window.TABOStockfish=api;
})();
