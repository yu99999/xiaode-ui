process.env.NODE_ENV = 'production';

const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');       // 体积分析插件

const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin(),
    // new BundleAnalyzerPlugin()       // 开启体积分析插件
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {   // 将 runtime 文件提取出来
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
}

// 开启速度分析插件
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// module.exports = smp.wrap(merge(commonConfig, prodConfig));

module.exports = merge(commonConfig, prodConfig);