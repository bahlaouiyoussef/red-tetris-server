const { promisify } = require("util");
const client = require("redis").createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.addGame = addGame.bind(client);

async function addGame(gameName) {
  var gamesStr = await this.getAsync("games");
  var games = JSON.parse(gamesStr);
  var game = games.find(gameEquals);

  if (!game) {
    games.push(gameName);
    gamesStr = JSON.stringify(games);

    await this.setAsync("games", gamesStr);
  }

  return gamesStr;

  // -----------
  function gameEquals(currentGame) {
    return currentGame == gameName;
  }
}

module.exports = client;
