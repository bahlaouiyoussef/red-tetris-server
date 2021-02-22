process.stdin.setRawMode(true);
var stdin = process.openStdin();

var Game = require("../app/classes/Game");
// var Board = require("../app/classes/Board");

var game = new Game("room-name");

var oxidia = game.addPlayer("oxidia");

game.start();

stdin.on("data", function (buffer) {
  var key = buffer.toString();

  if (key == "a") {
    oxidia.moveLeft();
  } else if (key == "d") {
    oxidia.moveRight();
  } else if (key == "q") {
    game.stop();
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }
});
