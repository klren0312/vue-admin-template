const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton.js')
        }
      },
      minimize: true,
      quiet: true
    }))
  },
  parallel: require('os').cpus().length > 1, // 构建开启多进程处理babel编译
}
