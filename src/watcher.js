const chokidar = require("chokidar");
const cwdPath = process.cwd();
const path = require("path");
require("colors");

function handleFileChange(socketEvent) {
  console.log("file change detected".green);
  socketEvent.emit("reload")
}

function createWatcher(socketEvent, watchDir) {
  const watcher = chokidar.watch(path.resolve(cwdPath, watchDir));
  watcher
    .on("change", () => handleFileChange(socketEvent))
}


module.exports = createWatcher;