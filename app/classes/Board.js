var Piece = require("./Piece");
var pieces = require("./pieces.json");

class Board {
  constructor(columns, rows) {
    this.setColumns(columns);
    this.setRows(rows);

    this._initBoard();
  }

  /*
   ** public functions
   */
  getColumns() {
    return this._columns;
  }

  getRows() {
    return this._rows;
  }

  setColumns(columns) {
    this._columns = columns;
  }

  setRows(rows) {
    this._rows = rows;
  }

  getBoard() {
    return this._board;
  }

  // rmLine(start, count) {}

  /*
   ** private functions
   */
  _putPiece(piece, boardRow, boardCol) {
    var board = this.getBoard();
    var pieceMatrix = piece.getMatrix();

    pieceMatrix.forEach(function (row, rowIndex) {
      var str = "";
      row.forEach((v, colIndex) => {
        str += v;
        board[rowIndex + boardRow][colIndex + boardCol] =
          pieceMatrix[rowIndex][colIndex];
      });
      console.log(str);
    });
  }

  _initBoard() {
    this._board = new Array(this.getRows()).fill(null);

    this._board = this._board.map(() => {
      return new Array(this.getColumns()).fill(0);
    });
  }

  _getPieceByName(name) {
    var index = pieces.findIndex(function (piece) {
      return piece.name == name;
    });
    var piece = pieces[index];

    return new Piece(piece);
  }

  _getRandomPiece() {
    var randomIndex = this._random(0, pieces.length);
    var piece = pieces[randomIndex];

    return new Piece(piece);
  }

  _random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

module.exports = Board;
