class Board {
  constructor(columns, rows) {
    this.setColumns(columns);
    this.setRows(rows);
    this.setCurrentPiece(null);

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

  setCurrentPiece(piece) {
    this._currentPiece = piece;
  }

  getCurrentPiece() {
    return this._currentPiece;
  }

  fall() {
    var piece = this.getCurrentPiece();

    if (piece) {
      var position = piece.getPosition();
      position.setY(position.getY() + 1);
    }
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
}

module.exports = Board;
