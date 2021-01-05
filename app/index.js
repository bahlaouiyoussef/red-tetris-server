var io = require("socket.io")(3000);
var redisAdapter = require("socket.io-redis");

if (process.env.NODE_ENV != "production") {
  // eslint-disable-next-line
  require("dotenv").config();
}
io.adapter(
  redisAdapter({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
);

io.use(function auth(socket, next) {
  next();
});

io.on("connection", function onConnection(socket) {
  console.log(`Client connected ${socket.id}`);
  // console.log("headers", socket.handshake.headers);
  socket.emit("message", "hello from server");
  socket.on("message", function onMessage(message) {
    console.log(message);
  });
});

module.exports = io;
