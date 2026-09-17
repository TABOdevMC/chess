(function(){
  'use strict';
  const BOOK=[
    {name:'Partie italienne',moves:['e4','e5','Nf3','Nc6','Bc4']},
    {name:'Défense espagnole',moves:['e4','e5','Nf3','Nc6','Bb5']},
    {name:'Défense sicilienne',moves:['e4','c5']},
    {name:'Défense française',moves:['e4','e6']},
    {name:'Défense Caro-Kann',moves:['e4','c6']},
    {name:'Défense scandinave',moves:['e4','d5']},
    {name:'Défense Alekhine',moves:['e4','Nf6']},
    {name:'Défense Pirc',moves:['e4','d6']},
    {name:'Gambit dame',moves:['d4','d5','c4']},
    {name:'Défense slave',moves:['d4','d5','c4','c6']},
    {name:'Défense Grünfeld',moves:['d4','Nf6','c4','g6','Nc3','d5']},
    {name:'Défense est-indienne',moves:['d4','Nf6','c4','g6','Nc3','Bg7']},
    {name:'Défense nimzo-indienne',moves:['d4','Nf6','c4','e6','Nc3','Bb4']},
    {name:'Défense dame-indienne',moves:['d4','Nf6','c4','e6','Nf3','b6']},
    {name:'Ouverture anglaise',moves:['c4','e5']},
    {name:'Ouverture Réti',moves:['Nf3','d5','c4']}
  ];
  function normalize(s){return String(s||'').replace(/[!?+#]/g,'').trim()}
  function getBook(moves){
    const a=moves.map(normalize);
    let best=null;
    for(const b of BOOK){
      const n=Math.min(a.length,b.moves.length), ok=a.slice(0,n).every((m,i)=>m===b.moves[i]);
      if(ok && (!best || b.moves.length>best.moves.length)) best=b;
    }
    return best;
  }
  function openingForPly(moves,i){
    const b=getBook(moves.slice(0,i));
    if(!b || i>b.moves.length || normalize(moves[i])!==b.moves[i-1]) return null;
    return b;
  }
  function addStyles(){
    if(document.getElementById('theory-analysis-style'))return;
    const s=document.createElement('style');s.id='theory-analysis-style';
    s.textContent='.theory-box{margin:10px 0;padding:12px 14px;border:1px solid #7c5cff55;border-radius:12px;background:#7c5cff10}.theory-title{font-weight:800;color:#c4b5fd}.theory-badge{display:inline-flex;align-items:center;gap:5px;margin-left:7px;padding:4px 8px;border-radius:999px;background:#7c5cff22;color:#c4b5fd;font-size:11px;font-weight:800}.review-theory{margin-left:6px;color:#c4b5fd;font-size:11px;font-weight:700}'
    document.head.appendChild(s);
  }
  function enhance(){
    addStyles();
    const body=document.getElementById('analysisReviewBody');
    if(!body || !Array.isArray(window.__chessAnalysisResults)) return;
    const results=window.__chessAnalysisResults;
    const moves=results.map(r=>r.san);
    let opening=null;let count=0;
    for(let i=0;i<moves.length;i++){
      const b=openingForPly(moves,i+1);
      if(!b)break;opening=b;count=i+1;
    }
    let box=document.getElementById('theoryBox');
    if(!box){box=document.createElement('div');box.id='theoryBox';body.parentNode.insertBefore(box,body);}
    if(opening && count){
      const next=opening.moves[count]||null;
      box.className='theory-box';
      box.innerHTML='<div class="theory-title">♟ Coups théoriques</div><div>'+opening.name+' · '+count+' coup'+(count>1?'s':'')+' dans la théorie'+(next?' · Suite théorique : <b>'+next+'</b>':'')+'</div>';
    }else{
      box.className='theory-box';box.innerHTML='<div class="theory-title">♟ Coups théoriques</div><div>Cette position ne correspond pas à une ligne d’ouverture reconnue dans le livre intégré.</div>';
    }
    body.querySelectorAll('.review-row').forEach((row,i)=>{
      if(row.querySelector('.review-theory'))return;
      if(i<count){const span=document.createElement('span');span.className='review-theory';span.textContent='Théorique';row.appendChild(span);}
    });
  }
  window.addTheoryToAnalysis=enhance;
  document.addEventListener('DOMContentLoaded',function(){setTimeout(enhance,300);});
})();