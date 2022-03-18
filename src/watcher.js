const chokidar = require("chokidar");
const cwdPath = process.cwd();
const path = require("path");
require("colors");

function handleFileChange(socketEvent, e) {
  console.log(`file change detected ${e}`.green);
  socketEvent.emit("reload")
}

function createWatcher(socketEvent, watchDir) {
  const watcher = chokidar.watch(path.resolve(cwdPath, `.${watchDir}`));
  watcher
    .on("change", (e) => handleFileChange(socketEvent, e))
}


module.exports = createWatcher;