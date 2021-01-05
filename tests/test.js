var Board = require("../app/classes/Board");

var board = new Board(10, 20);
// var p = board.getRandomPiece();
var p = board._getPieceByName("I");
var half = Math.floor(p.getMatrix().length / 2);
board._putPiece(p, 0, 5 - half - (half % 2 ? 1 : 0));
console.log(p.getName());
var boardRows = board.getBoard().reduce((acc, row) => {
  return acc + row.join("") + "\n";
}, "");

console.log(boardRows);
