#!/usr/bin/env node

const commander = require("commander");
const version = require("./package").version;
const { create, dev, prod } = require("./commands");

/** 引入commander包
 * @version(version,'-V --version [myVar]', '选项描述信息') 用来显示
 * 版本号，不明确指出会隐式调用。可以使用version(version)简写形式
 * @command(<command> [options],description) 注册命令
 * @description(description) 命令描述
 * @usage() 显示命令的用途
 * @option('-m --myarg [myVar]', '选项描述信息') 显示命令选项
 * @action(callback) 执行命令的函数
 * @parse(process.argv) 解析控制台输入的参数
 */
commander
  .version(version)
  .usage(`通过此文件注册二级命令，在package.json的bin中注册一级命令`);

// 注册create命令
commander
  .command("create <projectName>")
  .description(
    "显示在控制台的命令描述。<>里代表变量，不能省略，[]里代表可选变量，使用可选变量时，子命令中不应该有.action(callback)。命令其实就是要执行的函数！！！"
  )
  .action(create);

// 注册dev命令
commander
  .command("dev")
  .description("启动开发服务器，进行本地开发")
  .action(dev);

// 注册build命令
commander.command("build").description("生产环境打包构建").action(prod);

// 注册 exec <cmd> 命令
commander
  .command("exec <cmd>")
  .alias("ex")
  .description("execute the given remote cmd")
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .option("-c, --cheese [type]", "指定类型：cheese [marble]", "marble")
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  })
  .on("--help", function () {
    console.log("");
    console.log("Examples:");
    console.log("");
    console.log("  $ deploy exec sequential");
    console.log("  $ deploy exec async");
  });

// 解析控制台输入的参数
commander.parse(process.argv);

// 监控输入--help的事件回调
commander.on("--help", function () {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});

//通过侦听command和option事件来执行自定义操作。
commander.on("option:cheese", function () {
  console.log("option:cheese:this.cheese- %s", this.cheese);
});

// error on unknown commands
commander.on("command:*", function () {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    commander.args.join(" ")
  );
  process.exit(1);
});
