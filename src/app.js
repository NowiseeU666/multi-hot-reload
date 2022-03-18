const Koa = require('koa');
const app = new Koa();

const { injectFile, injectRes } = require("./inject");

let options = "";

app.use((ctx, next) => {
  ctx.res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

function sendFile(ctx, next) {
  const url = ctx.request.url;
  const ret = injectRes(options, url);
  ctx.body = ret.content;
  ctx.set('content-type', ret.type);
  next();
}

function createApp(opt) {
  options = opt;
  let { socketHost, socketPort, devServer } = options;
  devServer = devServer && devServer.replace('http://', '');
  let socketServer = `${socketHost}:${socketPort}`.replace('http://', '');
  if (devServer && devServer !== socketServer) {
    // 前后端不分离项目，注入前端socket代码重写入口文件，node socket服务与php服务、java服务等通信，
    injectFile(options);
  } else {
    // 单一服务，返回时注入前端socket代码
    app.use(sendFile);
  }
  return app;
}

module.exports = createApp;