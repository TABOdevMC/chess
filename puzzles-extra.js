(function(){
'use strict';

// 12 mate-in-one positions. Source: Lichess puzzle database via Boardgammon's
// public-domain puzzle presentation (CC0 attribution noted on the source page).
const EXTRA_PUZZLES = [
  {fen:'6k1/5pp1/7p/P2p4/3P2Q1/4qP2/6PP/4R2K b - - 0 32', uci:'e3e1', answer:'Qxe1#', rating:400, theme:'Mat en 1'},
  {fen:'5B2/6pk/2p2p2/3p1q1p/3P3P/3bPPQ1/5KP1/8 w - - 14 46', uci:'g3g7', answer:'Qxg7#', rating:493, theme:'Mat en 1'},
  {fen:'3r2k1/pb3p2/6pQ/4p1Bp/P7/2P5/6RP/7K b - - 0 37', uci:'d8d1', answer:'Rd1#', rating:545, theme:'Mat en 1'},
  {fen:'r1b2rk1/1pqpppb1/p5p1/2P4p/N2NP1n1/8/PPP1BPPP/R2Q1RK1 b - - 3 12', uci:'c7h2', answer:'Qxh2#', rating:590, theme:'Mat en 1'},
  {fen:'r4rk1/1pp2ppp/6b1/1P1n2q1/Pp1Q4/8/1B1N1PP1/4R1K1 w - - 0 24', uci:'d4g7', answer:'Qxg7#', rating:656, theme:'Mat en 1'},
  {fen:'3r3k/6b1/7p/4p1p1/8/PQP3P1/1P1p2PP/4R2K b - - 0 45', uci:'d2e1q', answer:'dxe1=Q#', rating:733, theme:'Promotion + mat'},
  {fen:'2r2k1r/q4p2/p2p4/1B1Pp1Q1/7p/1N3Pn1/PPR3PK/8 w - - 10 30', uci:'c2c8', answer:'Rxc8#', rating:811, theme:'Mat en 1'},
  {fen:'r4rk1/pQ4p1/3p3p/1Np4P/2P5/1PB1qp2/P3P3/R4K2 w - - 0 26', uci:'b7g7', answer:'Qxg7#', rating:908, theme:'Mat en 1'},
  {fen:'r1b4k/pp1p1rpB/4pp2/n3P1NQ/1q1P1n2/8/PP3PPP/R4K1R w - - 0 19', uci:'g5f7', answer:'Nxf7#', rating:993, theme:'Mat en 1'},
  {fen:'r2qkn2/pp1bbn2/2ppp1P1/8/3P2r1/2NBB3/PPP3PP/R4RK1 w q - 0 16', uci:'g6f7', answer:'gxf7#', rating:1164, theme:'Mat en 1'},
  {fen:'q4rk1/6p1/p2p3p/1p3R2/3N4/2P1n2P/PP4P1/R3Q1K1 b - - 0 24', uci:'a8g2', answer:'Qxg2#', rating:1405, theme:'Mat en 1'},
  {fen:'6rr/8/p1kpRn1q/1ppp1Q2/5P2/2P3N1/PP3B2/3R2K1 b - - 0 30', uci:'h6h1', answer:'Qh1#', rating:1940, theme:'Mat en 1'}
];

function puzzlePiece(type,color){
  const paths={p:'M12 3c-2 0-3 1.5-3 3 0 1.1.6 2 1.5 2.6C8.5 10 7 12 7 14h10c0-2-1.5-4-3.5-5.4C14.4 8 15 7.1 15 6c0-1.5-1-3-3-3zm-6 13h12v2H6z',n:'M7 19h10v-2H9c0-3 2-5 6-7l-2-6H8l-2 4 3 2c-3 2-4 5-4 9z',b:'M12 3c-3 2-5 5-5 8 0 2 1 3 3 4H7v2h10v-2h-3c2-1 3-2 3-4 0-3-2-6-5-8zm0 3c1.4 1.7 2.3 3.3 2.3 5H9.7c0-1.7.9-3.3 2.3-5z',r:'M6 3h12v3h-2v7h2v4H6v-4h2V6H6z',q:'M5 5l2 3 5-5 5 5 2-3-2 10H7zM6 17h12v2H6z',k:'M11 2h2v3h3v2h-3v3h4v7H7v-7h4V7H8V5h3zm-2 12v3h6v-3z'};
  const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 24 24');s.classList.add('piece');
  const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',paths[type]);p.setAttribute('fill',color==='w'?'#fff':'#111');p.setAttribute('stroke',color==='w'?'#111':'#fff');p.setAttribute('stroke-width','1.1');s.appendChild(p);return s;
}

function installExtraPuzzles(){
  if(window.__extraPuzzlesInstalled || typeof Chess==='undefined') return;
  const board=document.getElementById('puzzleBoard'), status=document.getElementById('puzzleStatus'), title=document.getElementById('puzzleTitle'), text=document.getElementById('puzzleText'), result=document.getElementById('puzzleResult'), count=document.getElementById('puzzleCount');
  const hint=document.getElementById('puzzleHint'), solution=document.getElementById('puzzleSolution'), next=document.getElementById('puzzleNew');
  if(!board||!status||!title||!text||!result||!count||!hint||!solution||!next) return;
  window.__extraPuzzlesInstalled=true;
  let index=0, game=null, selected=null, solved=false, hintOn=false;

  function current(){return EXTRA_PUZZLES[index];}
  function load(){
    const p=current();
    game=new Chess(p.fen); selected=null; solved=false; hintOn=false;
    const side=game.turn();
    title.textContent='Problème '+(index+1);
    count.textContent=(index+1)+' / '+EXTRA_PUZZLES.length;
    text.textContent=(side==='w'?'Blancs':'Noirs')+' jouent · '+p.theme+' · niveau '+p.rating;
    result.textContent='Trouvez le meilleur coup.';
    result.style.color=''; status.textContent='À vous — '+(side==='w'?'Blancs':'Noirs');
    hint.textContent='Indice'; solution.textContent='Solution'; next.textContent='Suivant';
    draw();
  }
  function draw(){
    board.innerHTML='';
    const side=game.turn()==='b'?'b':'w';
    const ranks=side==='w'?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];
    const files=side==='w'?'abcdefgh':'hgfedcba';
    const target=current().uci.slice(2,4), source=current().uci.slice(0,2);
    const legal=selected?game.moves({square:selected,verbose:true}):[];
    for(let r=0;r<8;r++)for(let c=0;c<8;c++){
      const sq=files[c]+ranks[r], q=document.createElement('button'); q.type='button'; q.className='sq '+(((('abcdefgh').indexOf(files[c])+ranks[r])%2===0)?'light':'dark');
      if(sq===selected)q.classList.add('selected');
      if(hintOn&&(sq===source||sq===target))q.style.boxShadow='inset 0 0 0 5px #7857ff';
      const lm=legal.find(m=>m.to===sq); if(lm)q.classList.add(lm.captured?'capture':'legal');
      const piece=game.get(sq); if(piece)q.appendChild(puzzlePiece(piece.type,piece.color));
      q.onclick=function(){click(sq)}; board.appendChild(q);
    }
  }
  function click(sq){
    if(solved)return;
    const p=game.get(sq);
    if(!selected){if(p&&p.color===game.turn()){selected=sq;draw()}return;}
    const uci=selected+sq+(p&&false?'q':'');
    const wanted=current().uci;
    let move=null; try{move=game.move({from:selected,to:sq,promotion:'q'});}catch(e){move=null}
    if(!move){selected=null;draw();return;}
    if(uci===wanted || (wanted.length===5&&uci===wanted)){
      solved=true; result.textContent='✓ Correct ! '+current().answer; result.style.color='var(--green)'; status.textContent='Problème réussi';
    }else{
      result.textContent='✗ Pas le bon coup. Cherchez le mat.'; result.style.color='var(--red)';
      game.undo();
    }
    selected=null;draw();
  }
  hint.onclick=function(){if(solved)return;hintOn=true;result.textContent='Indice : regardez les coups qui donnent échec.';draw()};
  solution.onclick=function(){if(solved)return;const p=current();try{game.move({from:p.uci.slice(0,2),to:p.uci.slice(2,4),promotion:p.uci.slice(4)||undefined});}catch(e){}solved=true;result.textContent='Solution : '+p.answer;result.style.color='var(--accent)';status.textContent='Solution affichée';selected=null;draw()};
  next.onclick=function(){index=(index+1)%EXTRA_PUZZLES.length;load()};
  load();
}

function boot(){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installExtraPuzzles); else installExtraPuzzles();
  setTimeout(installExtraPuzzles,500);
  setTimeout(installExtraPuzzles,1500);
}
boot();
})();
