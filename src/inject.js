const fs = require("fs");
const path = require("path");
const cwdPath = process.cwd();
const initScript = require("./client.js")
const mime = require('mime-types');

function resetHtml(html, injectCode) {
  if (html.indexOf("<script id='inject'>") !== -1) {
    const delReg = /[\s]*<script id='inject'>[\s\S]*<\/script>/
    html = html.replace(delReg, "");
  }
  if (/<\/body>/.test(html)) {
    let cacheArr = html.split("</body>");
    html = `${cacheArr[0]}</body>
<script id='inject'>
  ${injectCode}
</script>${cacheArr[1]}`
  } else {
    html += `
<script id='inject'>
  ${injectCode}
</script>`
  }
  return html;
}

function injectFile(options) {
  let injectContent = initScript(options),
    targetFilePath = path.resolve(cwdPath, `.${options.target}`),
    targetContent = fs.readFileSync(targetFilePath, "utf-8");
  targetContent = resetHtml(targetContent, injectContent);
  fs.writeFileSync(targetFilePath, targetContent);
}

function injectRes(options, url) {
  let targetFilePath = path.resolve(cwdPath, `.${options.watchDir}${url}`),
    targetContent = "",
    mimeType = mime.lookup(targetFilePath);
  if (url.endsWith('html')) {
    targetContent = fs.readFileSync(targetFilePath, "utf-8");
    let injectContent = initScript(options);
    targetContent = resetHtml(targetContent, injectContent);
  } else {
    targetContent = fs.readFileSync(targetFilePath);
  }
  return {
    content: targetContent,
    type: mimeType,
  };
}

module.exports = {
  injectFile,
  injectRes,
}