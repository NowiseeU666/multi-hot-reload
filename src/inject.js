const fs = require("fs");
const path = require("path");
const cwdPath = process.cwd();
const initScript = require("./client.js")

let targetFilePath = "", targetContent = "", injectContent = "";

function customReadFile(filePath) {
    try {
        const content = fs.readFileSync(filePath).toString()
        return content;
    } catch (error) {
        console.log(`${filePath} readFile error`.red);
    }
}

function inject(options) {
    targetFilePath = path.resolve(cwdPath, options.target)
    injectContent = initScript(options)
    targetContent = customReadFile(options.target);
    if (targetContent.indexOf("<script id='inject'>") !== -1) {
        const delReg = /[\s]*<script id='inject'>[\s\S]*<\/script>/
        targetContent = targetContent.replace(delReg, "");
        fs.writeFileSync(targetFilePath, targetContent);
    }
    if(targetContent.indexOf("<script id='inject'>") !== -1) {
        return;
    }
    if (/<\/body>/.test(targetContent)) {
        let cacheArr = targetContent.split("</body>");
        targetContent = `${cacheArr[0]}</body>
<script id='inject'>
    ${injectContent}
</script>${cacheArr[1]}`
    } else {
        targetContent += `
<script id='inject'>
    ${injectContent}
</script>`
    }
    fs.writeFileSync(targetFilePath, targetContent);
}


module.exports = inject