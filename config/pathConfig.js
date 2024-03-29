const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd()); // 获取当前根目录
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appHtml: resolvePath("public/index.html"), // 模板html
  appBuild: resolvePath("dist"), // 打包目录
  appIndexJs: resolvePath("src/main.js") // 入口js文件
};
