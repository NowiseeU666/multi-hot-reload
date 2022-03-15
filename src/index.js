require("colors")
const createSocketServer = require("./socket");

const hotServerInstance = {};

const defaultOptions = {
  socketHost: "127.0.0.1",
  socketPort: "80",
  watchDir: process.cwd(),
  target: "./dist/index.html",
  devServer: "127.0.0.0"
}

function setOptions(userOpt) {
  const options = {};
  for (let key in defaultOptions) {
    options[key] = userOpt[key] || defaultOptions[key];
  }
  return options;
}

hotServerInstance.start = function(userOpt) {
  hotServerInstance.options = setOptions(userOpt);
  if (!hotServerInstance.options.target) {
    console.log("target can't be empty".red);
    return;
  }
  createSocketServer(hotServerInstance.options)
}

module.exports = hotServerInstance