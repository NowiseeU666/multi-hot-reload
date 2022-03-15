const { Server } = require("socket.io");
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("colors")

const inject = require("./inject");

const createWatcher = require("./watcher");


function createSocketServer(options) {
    const io = new Server(server, { cors: true });

    inject(options);

    server.listen(options.socketPort, () => {
        console.log(`socket listening on port ${server.address().port}`.green);
    });

    io.on('connection', (socketEvent) => {
        createWatcher(socketEvent, options.watchDir);
    });
    io.on("disconnection", () => {
        console.log(`socket disconnection`.green);
        delInject(options.target)
    })
}

module.exports = createSocketServer;

