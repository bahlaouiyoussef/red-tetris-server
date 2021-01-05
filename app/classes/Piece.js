var Vector = require("./Vector");

class Piece {
  constructor(piece) {
    var { name, matrix } = piece;

    this._setName(name);
    this._setMatrix(matrix);
    this._vector = new Vector(0, 0);
  }

  _setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  _setMatrix(matrix) {
    this._matrix = matrix;
  }

  getMatrix() {
    return this._matrix;
  }

  rotate() {
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

    // -------------
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
