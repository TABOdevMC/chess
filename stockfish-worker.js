// Same-origin worker: avoids the browser blocking a cross-origin Worker on GitHub Pages.
var Module = {
  locateFile: function (path) {
    return 'https://cdn.jsdelivr.net/npm/stockfish@18.0.8/src/' + path;
  }
};
importScripts('https://cdn.jsdelivr.net/npm/stockfish@18.0.8/src/stockfish-18-lite-single.js');
