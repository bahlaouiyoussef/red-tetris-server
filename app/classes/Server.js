var Game = require("./Game");

class Server {
  constructor(socketIo, redisClient) {
    // bind functions
    this._onSocketConnection = this._onSocketConnection.bind(this);
    this._createOnSocketJoinGame = this._createOnSocketJoinGame.bind(this);

    redisClient
      .setAsync("games", JSON.stringify([]))
      .catch((e) => console.error(e.message));

    this._games = [];
    this._setRedisClient(redisClient);
    this._setSocketIo(socketIo);
    this._initEvents();
  }

  _getGame(gameName) {
    return gameName;
  }

  _startGame(gameName) {
    var game = this._getGame(gameName);

    if (game) {
      game.start();
    }
  }

  async _createOrJoinGame(gameName, playerName) {
    var redisClient = this._getRedisClient();

    var gameInstance = this._games.find(equals(gameName));
    var gamesStr = await redisClient.getAsync("games");
    var games = JSON.parse(gamesStr);

    if (!gameInstance) {
      gameInstance = new Game(gameName);
      this._games.push(gameInstance);

      games.push(gameName);
      gamesStr = JSON.stringify(games);

      await redisClient.setAsync("games", gamesStr);
    }

    gameInstance.addPlayer(playerName);
    gameInstance.getPlayers().forEach((p) => console.log(p.getName()));

    return games;

    // -----------
    function equals(str) {
      return function strEquals(game) {
        return str == game.getName();
      };
    }
  }

  _setSocketIo(socketIo) {
    this._socketIo = socketIo;
  }

  _getSocketIo() {
    return this._socketIo;
  }

  _setRedisClient(redisClient) {
    this._setRedisClient = redisClient;
  }

  _getRedisClient() {
    return this._setRedisClient;
  }

  async _getGames() {
    var redisClient = this._getRedisClient();

    var games = await redisClient.getAsync("games");

    return JSON.parse(games);
  }

  getGameByName(gameName) {
    return this._games.find(equals(gameName));

    // -----------
    function equals(str) {
      return function strEquals(game) {
        return str == game.getName();
      };
    }
  }

  _initEvents() {
    var socketIo = this._getSocketIo();

    socketIo.on("connection", this._onSocketConnection);
  }

  async _onSocketConnection(socket) {
    console.log("client connected", socket.id);

    // emit games
    var games = await this._getGames();
    socket.emit("games", games);

    // init player event
    socket.on("join_game", this._createOnSocketJoinGame(socket));
    socket.on("start", this._createOnGameStart(socket));
    socket.on("move", this._createOnPlayerMove(socket));
  }

  _createOnSocketJoinGame(socket) {
    return async (data) => {
      var { gameName, playerName } = data;
      // check if player already in game

      socket.join(gameName);
      var games = await this._createOrJoinGame(gameName, playerName);
      socket.emit("games", games);
    };
  }

  _createOnPlayerMove(socket) {
    return (data) => {
      var {
        gameName,
        playerName,
        action // = ["right", "left", "fall"]
      } = data;

      var game = this.getGameByName(gameName);
      if (game) {
        var player = game.getPlayerByName(playerName);
        if (action == "right") {
          player.moveRight();
        } else if (action == "left") {
          player.moveLeft();
        }
      }
    };
  }

  _createOnGameStart(socket) {
    return (data) => {
      var { gameName } = data;

      var game = this.getGameByName(gameName);

      if (game) {
        game.start();
      } else {
        console.log("not found");
      }
    };
  }
}

module.exports = Server;
