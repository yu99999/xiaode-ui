// 初始化环境
process.env.NODE_ENV = 'development';

const commonConfig = require('./webpack.common')
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const path = require('path')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const {dllManifestPath, publicPath} = require('./paths')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9999,
    hot: true,
    progress: true,
    historyApiFallback: true,   // 当使用history路由时也能正常返回index.html
    stats: "errors-only",
    proxy: {
      // '/api': {
      //   target: '',
      //   pathRewrite: {'^/api': ''}
      // }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: dllManifestPath
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js'),
      publicPath
    })
  ],
  performance: false,
  optimization: {
    sideEffects: true
  }
}

module.exports = merge(commonConfig, devConfig)