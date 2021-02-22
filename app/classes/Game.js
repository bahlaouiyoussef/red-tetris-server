var Piece = require("./Piece");
var Player = require("./Player");

var pieces = require("./pieces.json");

class Game {
  constructor(name) {
    this._setName(name);

    this._players = [];
    this._pieces = [
      this._getRandomPiece(),
      this._getRandomPiece(),
      this._getRandomPiece(),
      this._getRandomPiece(),
      this._getRandomPiece()
    ];
  }

  _setName(name) {
    this._name = name;
  }
  getName() {
    return this._name;
  }

  getPlayerByName(playerName) {
    return this.getPlayers().find(equals(playerName));

    function equals(str) {
      return function strEquals(player) {
        return str == player.getName();
      };
    }
  }

  addPlayer(playerName) {
    var player = this.getPlayerByName(playerName);

    if (!player) {
      player = new Player(playerName, Math.random(), this);
      player.initBoard(10, 20);
      this._players.push(player);
    }
    return player;
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

  stop() {
    clearInterval(this._interval);
  }

  start() {
    var piece = this._getRandomPiece();
    // var piece = this._getPieceByName("T");

    this.getPlayers().forEach(function setCurrentPiece(player) {
      player.getBoard().setCurrentPiece(piece.clone());
    });

    this._interval = setInterval(() => {
      console.clear();
      this.getPlayers().forEach((player) => {
        var isFalling = player.getBoard().fall();
        if (!isFalling) {
          player.getBoard().setCurrentPiece(this._pieces.shift().clone());
          this._pieces.push(this._getRandomPiece());
        }
        player.getBoard().display();
        console.log("-------------------");
      });
    }, 500);
  }
}

module.exports = Game;
