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
      // this._delPiece(piece, position.getY(), position.getX());
      if (this._canPutPiece(piece, position.getY(), position.getX())) {
        position.setY(position.getY() + 1);
        return true;
      } else {
        this._putPiece(piece, position.getY(), position.getX());
        return false;
      }
    }
    return false;
  }

  // rmLine(start, count) {}

  /*
   ** private functions
   */
  _putPiece(piece, boardRow, boardCol) {
    var board = this.getBoard();
    var pieceMatrix = piece.getMatrix();

    pieceMatrix.forEach((row, rowIndex) => {
      row.forEach((v, colIndex) => {
        let newRow = rowIndex + boardRow;
        let newCol = colIndex + boardCol;

        if (newRow < this.getRows() && newCol < this.getColumns()) {
          board[newRow][newCol] = pieceMatrix[rowIndex][colIndex];
        }
      });
    });
  }

  _delPiece(piece, boardRow, boardCol) {
    var board = this.getBoard();
    var pieceMatrix = piece.getMatrix();

    pieceMatrix.forEach((row, rowIndex) => {
      row.forEach((v, colIndex) => {
        let newRow = rowIndex + boardRow;
        let newCol = colIndex + boardCol;

        if (newRow < this.getRows() && newCol < this.getColumns()) {
          board[newRow][newCol] = 0;
        }
      });
    });
  }

  _canPutPiece(piece, boardRow, boardCol) {
    var board = this.getBoard();
    var pieceMatrix = piece.getMatrix();
    var canPut = true;

    pieceMatrix.forEach((row, rowIndex) => {
      row.forEach((v, colIndex) => {
        let newRow = rowIndex + boardRow;
        let newCol = colIndex + boardCol;

        if (newRow < this.getRows() && newCol < this.getColumns()) {
          if (
            board[newRow][newCol] == 1 &&
            pieceMatrix[rowIndex][colIndex] == 1
          ) {
            canPut = false;
          }
        } else {
          canPut = false;
        }
      });
    });

    return canPut;
  }

  _initBoard() {
    this._board = new Array(this.getRows()).fill(null);

    this._board = this._board.map(() => {
      return new Array(this.getColumns()).fill(0);
    });
  }

  display() {
    console.log(this.getCurrentPiece().getName());
    this.getBoard().forEach(function displayRow(row) {
      console.log(row.join(""));
    });
  }
}

module.exports = Board;
