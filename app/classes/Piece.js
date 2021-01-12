var Vector = require("./Vector");

class Piece {
  constructor(piece) {
    this._position = new Vector(0, 0);

    if (piece) {
      var { name, matrix } = piece;

      this.setName(name);
      this.setMatrix(matrix);
    }
  }

  clone() {
    var newPiece = new Piece();

    newPiece.setName(this.getName());
    newPiece.setMatrix(this.getMatrix());

    return newPiece;
  }

  trim() {
    return this.getMatrix().filter(function isNotEmpty(row) {
      return row.every(v => v);
    });
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

  rotateRight() {
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
