/* Fix for chess.js 0.10.x board clicks: empty destination squares must be accepted. */
(function(){
  'use strict';
  var originalGet = Chess && Chess.prototype.get;
  if(!originalGet) return;
  var allowEmpty = false;
  var original = originalGet;
  Chess.prototype.get = function(square){
    var piece = original.call(this, square);
    if(!piece && allowEmpty) return { color: this.turn(), type: '__empty__' };
    return piece;
  };
  document.addEventListener('click', function(e){
    var cell = e.target && e.target.closest ? e.target.closest('.board .sq') : null;
    if(!cell) return;
    var hasPiece = !!cell.querySelector('.board-piece');
    allowEmpty = !hasPiece;
    setTimeout(function(){ allowEmpty = false; }, 0);
  }, true);
})();
