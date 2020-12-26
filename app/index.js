var io = require("socket.io")(3000);

if (process.env.NODE_ENV == "development") {
  // eslint-disable-next-line
  require("dotenv").config();
}

io.use(function auth(socket, next) {
  next();
});

io.on("connection", function onConnection(socket) {
  console.log(`Client connected ${socket.id}`, socket.handshake.headers);
  socket.emit("message", "hello from server");
});

module.exports = io;
