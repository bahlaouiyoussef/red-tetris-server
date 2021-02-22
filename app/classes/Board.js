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

  moveRight() {
    var currentPiece = this.getCurrentPiece();
    var position = currentPiece.getPosition();
    var width = currentPiece.trim()[0].length;

    if (position.getX() + width < this.getColumns()) {
      currentPiece.moveRight();
      return true;
    } else {
      return false;
    }
  }

  moveLeft() {
    var currentPiece = this.getCurrentPiece();
    var position = currentPiece.getPosition();

    if (position.getX() > 0) {
      currentPiece.moveLeft();
      return true;
    } else {
      return false;
    }
  }

  fall() {
    var piece = this.getCurrentPiece();

    if (piece) {
      var position = piece.getPosition();
      if (this._canPutPiece(piece, position.getY(), position.getX())) {
        piece.moveDown();
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
    var pieceMatrix = piece.trim();

    pieceMatrix.forEach((row, rowIndex) => {
      row.forEach((v, colIndex) => {
        let newRow = rowIndex + boardRow;
        let newCol = colIndex + boardCol;

        if (newRow < this.getRows() && newCol < this.getColumns()) {
          if (!board[newRow][newCol]) {
            board[newRow][newCol] = v;
          }
        }
      });
    });
  }

  _canPutPiece(piece, rowNum, colNum) {
    var board = this.getBoard();
    var matrix = piece.trim();
    var width = matrix[0].length;
    var height = matrix.length;

    if (rowNum + height >= board.length) {
      return false;
    }

    // 111
    // 010
    // 000

    // 11
    // 11
    // 00
    return matrix
      .map(function canPut(row, rowIndex) {
        var boardRow = board[rowNum + rowIndex + 1].slice(
          colNum,
          colNum + width
        );
        var pieceNextRow = matrix[rowIndex + 1];

        return row.reduce(function _canPut(result, cell, i) {
          if (pieceNextRow && pieceNextRow[i] == 0) {
            return result;
          }
          if (result && cell == 1 && boardRow[i] == 1) {
            return false;
          }

          return result;
        }, true);
      })
      .every((x) => x);
  }

  _initBoard() {
    this._board = new Array(this.getRows()).fill(null);

    this._board = this._board.map(() => {
      return new Array(this.getColumns()).fill(0);
    });
  }

  display() {
    var p = this.getCurrentPiece();
    const y = p.getPosition().getY();
    const x = p.getPosition().getX();
    var matrix = p.trim();

    console.log(p.getName());
    this.getBoard().forEach(function displayRow(row, index) {
      var newRow = [...row];
      var pieceRow = matrix[index - y];

      if (pieceRow && index >= y) {
        newRow = newRow.map(function setValue(v, i) {
          if (i >= x && i < x + matrix[0].length) {
            return matrix[index - y][i - x] == 1 ? p.getName() : 0;
          }
          return v;
        });
      }
      console.log(newRow.join("").replace(/1/g, "-").replace(/0/g, "_"));
    });
  }
}

module.exports = Board;
