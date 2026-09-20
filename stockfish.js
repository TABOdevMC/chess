/* Stockfish 19 lite single-threaded loader for GitHub Pages. */
(function(){'use strict';
  const ENGINE_URL='https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-lite-single.js';
  let worker=null,readyPromise=null,busy=false,readyForSearch=false;
  const api={_initialized:false,_resolve:null,_reject:null,_mode:null,_lastScore:null,_bestDepth:-1};

  function create(){
    if(worker) return readyPromise;
    readyPromise=new Promise(function(resolve,reject){
      try{worker=new Worker(ENGINE_URL);}catch(e){reject(e);return;}
      worker.onmessage=function(e){
        const line=typeof e.data==='string'?e.data.trim():'';
        if(line==='uciok'){
          worker.postMessage('isready');
          return;
        }
        if(line==='readyok'){
          readyForSearch=true;
          api._initialized=true;
          resolve(api);
          return;
        }
        const info=line.match(/^info .*?depth (\d+).*?score (cp|mate) (-?\d+)/);
        if(info){
          const depth=Number(info[1]);
          if(depth>=api._bestDepth){
            api._bestDepth=depth;
            api._lastScore={type:info[2],value:Number(info[3])};
          }
          return;
        }
        if(line.indexOf('bestmove ')===0){
          busy=false;
          if(api._mode==='move'&&api._resolve){
            const r=api._resolve;api._resolve=null;api._reject=null;api._mode=null;r(line.split(/\s+/)[1]);
          }else if(api._mode==='eval'&&api._resolve){
            const r=api._resolve,score=api._lastScore||{type:'cp',value:0};
            api._resolve=null;api._reject=null;api._mode=null;api._lastScore=null;api._bestDepth=-1;r(score);
          }
        }
      };
      worker.onerror=function(e){
        busy=false;readyForSearch=false;
        if(api._reject){const r=api._reject;api._resolve=null;api._reject=null;api._mode=null;r(e);}
        else reject(e);
      };
      worker.postMessage('uci');
    });
    return readyPromise;
  }

  api.init=function(){return create();};
  api.stop=function(){if(worker)worker.postMessage('stop');busy=false;};
  api.quit=function(){if(worker){worker.postMessage('quit');worker.terminate();}worker=null;readyPromise=null;readyForSearch=false;busy=false;api._initialized=false;api._resolve=null;api._reject=null;api._mode=null;};

  api.bestMove=function(fen,depth){
    return api.init().then(function(){
      if(busy) api.stop();
      busy=true;api._mode='move';api._lastScore=null;api._bestDepth=-1;
      return new Promise(function(resolve,reject){
        api._resolve=resolve;api._reject=reject;
        worker.postMessage('position fen '+fen);
        worker.postMessage('go depth '+Math.max(1,Math.min(14,Number(depth)||3)));
      });
    });
  };

  api.evaluate=function(fen,depth){
    return api.init().then(function(){
      if(busy) api.stop();
      busy=true;api._mode='eval';api._lastScore=null;api._bestDepth=-1;
      return new Promise(function(resolve,reject){
        api._resolve=resolve;api._reject=reject;
        worker.postMessage('position fen '+fen);
        worker.postMessage('go depth '+Math.max(4,Math.min(14,Number(depth)||10)));
      });
    });
  };

  window.TABOStockfish=api;
})();
