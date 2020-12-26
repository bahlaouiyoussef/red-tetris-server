var io = require("socket.io")(3000);

if (process.env.NODE_ENV == "development") {
  // eslint-disable-next-line
  require("dotenv").config();
}

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
