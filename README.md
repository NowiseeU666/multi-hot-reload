template-hot-server
===========

用于全后端不分离项目的热更新

Usage from node
---------------

```javascript
var server = require("template-hot-server");

var params = {
  socketPort: "8000", // server port
  watchDir: "./dist", //watch directory
  target: "./dist/index.html", // template file
  devServer: "127.0.0.1:8080" //php java server address
};
server.start(params);
```