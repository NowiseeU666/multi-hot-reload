function initScript(options) {
    const socketServer = `${options.socketHost}:${options.socketPort}`
    return `const devServerAddress = "http://${options.devServer || socketServer}",
        socketArc = "https://lib.baomitu.com/socket.io/4.4.1/socket.io.js",
        socketServerAddress = "${socketServer}"
    if (location.href.startsWith(devServerAddress) && "WebSocket" in window) {
        console.log(100);
        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", socketArc);
        document.body.appendChild(scriptEl);
        scriptEl.onload = res => {
            const socket = io(socketServerAddress);
            socket.on("reload", () => {
                location.reload();
            })
        }
    }`
}

module.exports = initScript;
