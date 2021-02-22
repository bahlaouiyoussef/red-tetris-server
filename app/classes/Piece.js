var Vector = require("./Vector");

class Piece {
  constructor(piece) {
    this._position = new Vector(0, 0);

    if (piece) {
      var { name, matrix } = piece;

      this.setName(name);
      this.setMatrix(matrix);
      this._trimedMatrix = null;
    }
  }

  clone() {
    var newPiece = new Piece();

    newPiece.setName(this.getName());
    newPiece.setMatrix(this.getMatrix());

    return newPiece;
  }

  trim() {
    if (this._trimedMatrix) {
      return this._trimedMatrix;
    }

    var newPiece = this.getMatrix().filter(function isNotEmpty(row) {
      return row.some((v) => v);
    });

    const minCol = newPiece.reduce(getMinCol, newPiece.length);
    const maxCol = newPiece.reduce(getMaxCol, 0);

    this._trimedMatrix = newPiece.map(function (row) {
      return row.slice(minCol, maxCol + 1);
    });

    return this._trimedMatrix;

    function getMinCol(minCol, row) {
      var curMinCol = row.indexOf(1);
      if (curMinCol >= 0) {
        return minCol < curMinCol ? minCol : curMinCol;
      } else {
        return minCol;
      }
    }

    function getMaxCol(maxCol, row) {
      var curMaxCol = row.lastIndexOf(1);
      if (curMaxCol >= 0) {
        return maxCol > curMaxCol ? maxCol : curMaxCol;
      } else {
        return maxCol;
      }
    }
  }

  getPosition() {
    return this._position;
  }

  setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  setMatrix(matrix) {
    this._matrix = matrix.map(function newRow(row) {
      return [...row];
    });
  }

  getMatrix() {
    return this._matrix;
  }

  moveRight() {
    this.trim();

    const x = this.getPosition().getX();

    this.getPosition().setX(x + 1);
    return true;
  }

  moveLeft() {
    this.trim();

    const x = this.getPosition().getX();

    this.getPosition().setX(x - 1);
    return true;
  }

  moveDown() {
    const y = this.getPosition().getY();

    this.getPosition().setY(y + 1);
  }

  rotateRight() {
    this._trimedMatrix = null;

    var matrix = this.getMatrix();

    var rotatedMatrix = createMatrix(matrix.length);
    var length = matrix.length;

    matrix.forEach(function (row, index) {
      index = length - index - 1;

      for (let i = 0; i < length; i++) {
        rotatedMatrix[i][index] = row[i];
      }
    });

    this._setMatrix(rotatedMatrix);

    // ---------------
    function createMatrix(length) {
      var matrix = new Array(length).fill(0);

      return matrix.map(function createRow() {
        var row = new Array(length).fill(0);
        return row;
      });
    }
  }
}

module.exports = Piece;
