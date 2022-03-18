const { Server } = require("socket.io");
const http = require("http");
const createApp = require("./app");
require("colors")

const createWatcher = require("./watcher");


function createSocketServer(options) {
  const server = http.createServer(createApp(options).callback());
  
  const io = new Server(server, { cors: true });

  server.listen(options.socketPort, () => {
    console.log(`socket listening on port ${server.address().port}`.green);
  });

  io.on('connection', (socketEvent) => {
    console.log("socket connection".green);
    createWatcher(socketEvent, options.watchDir);
  });
  io.on("disconnection", () => {
    console.log(`socket disconnection`.cyan);
    delInject(options.target)
  })
}

module.exports = createSocketServer;

