const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.com.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: 'dist',
    publicPath: '',
    host: "localhost",
    port: 3000,
    open: true, // 自动打开浏览器
    compress: true, // 启用gzip压缩
    hot: true,
    inline: true // 启用内联模式
  }
});
