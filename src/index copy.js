const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: true});
let socketInstance = null;
const chokidar = require("chokidar");
const path = require("path");
const cors = require('cors');
require("colors");

app.use((req, res, next) => {
  res.set({
      'Access-Control-Allow-Origin': 'http://fnb.com'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.get('/', (req, res) => {
  res.body = "socket";
});

io.on('connection', (socket) => {
  socketInstance = socket;
});

function handleFileChange() {
  socketInstance && socketInstance.emit("reload")
}

server.listen(80, () => {
  console.log('listening on *:80');
});

const watcher = chokidar.watch(path.resolve(__dirname, "./modules/mch/views"));
watcher.on("change", () => {
  console.log("file change");
  handleFileChange();
})