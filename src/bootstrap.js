#!/usr/bin/env node
const cwdPath = process.cwd();
const path = require("path");
require("colors");
const hotServerInstance = require("./server");

let config = "";

try{
  config = require(path.resolve(cwdPath, "./multi-hot-reload.json"));
} catch {
  throw new Error("Cannot find file multi-hot-reload.json");
}

hotServerInstance.start(config);