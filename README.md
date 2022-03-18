template-hot-server
===========

用于全后端不分离项目的热更新

Usage from node
---------------

```javascript
var server = require("template-hot-server");

var params = {
  socketHost: "127.0.0.1", //Socket域名
  socketPort: "3000", //Socket端口号
  watchDir: "/dist", //监听目录
  target: "/dist/index.html", // 前后端不分离时的主文件
  devServer: "test.com" //使用PHP JAVA开发时启动的服务器地址
};
server.start(params);

```