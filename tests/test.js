var Game = require("../app/classes/Game");
var Board = require("../app/classes/Board");

var game = new Game("room-name");

game.addPlayer("oxidia");
// game.addPlayer("0.00011");

game.start();
