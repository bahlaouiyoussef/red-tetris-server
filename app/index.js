var io = require("socket.io")(3000);

if (process.env.NODE_ENV == "development") {
  // eslint-disable-next-line
  require("dotenv").config();
}

io.on("connection", function onConnection(socket) {
  console.log("client connected")
});

module.exports = io;
