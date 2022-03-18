#!/usr/bin/env node
const cwdPath = process.cwd();
const path = require("path");
require("colors");
const hotServerInstance = require("./server");

let config = "";

try{
  config = require(path.resolve(cwdPath, "./.template-hot-server.json"));
} catch {
  throw new Error("Cannot find file .template-hot-server.json");
}

hotServerInstance.start(config);