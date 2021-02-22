const Board = require("./Board");

class Player {
  constructor(name, id, game) {
    this._setName(name);
    this._setId(id);
    this._setGame(game);
  }

  initBoard(columns, rows) {
    this._board = new Board(columns, rows);
  }

  moveRight() {
    return this.getBoard().moveRight();
  }

  moveLeft() {
    return this.getBoard().moveLeft();
  }

  roateRight() {}

  roateLeft() {}

  getBoard() {
    return this._board;
  }

  getName() {
    return this._name;
  }

  _setName(name) {
    this._name = name;
  }

  _setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }

  _setGame(game) {
    this._game = game;
  }

  getGame() {
    return this._game;
  }
}

module.exports = Player;
