// Same-origin worker. Use the ASM-JS build so GitHub Pages does not need
// to fetch a cross-origin WASM file from inside the worker.
importScripts('https://cdn.jsdelivr.net/npm/stockfish@18.0.8/src/stockfish-18-asm.js');
