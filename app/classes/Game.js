var Piece = require("./Piece");
var Player = require("./Player");
var isFunction = require("../utils/isFunction");

var pieces = require("./pieces.json");

class Game {
  constructor(columns, rows) {
    this._players = [];
    this.setColumns(columns);
    this.setRows(rows);
  }

  addPlayer(playerName) {
    var player = new Player(playerName);
    player.initBoard(this.getBoardColumns(), this.getBoardRows());
    this._players.push(player);
  }

  _initPiece() {
    var piece = this._getRandomPiece();
    var half = Math.floor(piece.getMatrix().length / 2);
    this._putPiece(piece, 0, 5 - half - (half % 2 ? 1 : 0));
    return piece;
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

  getPlayers() {
    return this._players;
  }

  start(callback) {
    var piece = this._getRandomPiece();

    this.getPlayers().forEach(function setCurrentPiece(player) {
      player.getBoard().setCurrentPiece(piece.clone())
    });

    setInterval(() => {
      this.update();

      if (isFunction(callback)) {
        callback();
      }
    }, 2000);
  }

  update() {
    this.getPlayers().forEach(function goDown(player) {
      player.getBoard().getBoard().fall();
    });
  }
}

module.exports = Game;
