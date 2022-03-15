function initScript(options) {
    return `const devServerAddress = "http://${options.devServer}",
        socketArc = "https://lib.baomitu.com/socket.io/4.4.1/socket.io.js",
        socketServerAddress = "http://localhost:${options.socketPort}"
    if (location.href.startsWith(devServerAddress) && "WebSocket" in window) {
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
