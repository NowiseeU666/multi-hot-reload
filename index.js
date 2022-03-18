const hotServerInstance = require("./src/server");
hotServerInstance.start({
  socketHost: "127.0.0.1",
  socketPort: "3000",
  watchDir: "/dist",
  target: "/dist/index.html",
  devServer: "test.com"
})