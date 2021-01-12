var Piece = require("./Piece");
var Player = require("./Player");
var isFunction = require("../utils/isFunction");

var pieces = require("./pieces.json");

class Game {
  constructor() {
    this._players = [];
  }

  addPlayer(playerName) {
    var player = new Player(playerName);
    player.initBoard(10, 20);
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
      player.getBoard().setCurrentPiece(piece.clone());
    });

    setInterval(() => {
      // console.clear();
      this.update();

      if (isFunction(callback)) {
        callback();
      }
    }, 100);
  }

  update() {
    this.getPlayers().forEach(function goDown(player) {
      player.getBoard().fall();
      player.getBoard().display();
      console.log("-------------------");
    });
  }
}

module.exports = Game;
