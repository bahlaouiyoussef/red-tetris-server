const Board = require("./Board");

class Player {
  constructor(name) {
    this.setName(name);
  }

  initBoard(columns, rows) {
    this._board = new Board(columns, rows);
  }

  moveRight() {}

  moveLeft() {}

  roateRight() {}

  roateLeft() {}

  getBoard() {
    return this._board;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }
}

module.exports = Player;
