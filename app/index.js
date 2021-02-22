if (process.env.NODE_ENV != "production") {
  // eslint-disable-next-line
  require("dotenv").config();
}

var io = require("socket.io")(3000);
var Server = require("./classes/Server");
var redisAdapter = require("socket.io-redis");
var redisClient = require("./utils/redisClient");

io.adapter(
  redisAdapter({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
);

var server = new Server(io, redisClient);

io.use(function auth(socket, next) {
  next();
});

module.exports = io;
