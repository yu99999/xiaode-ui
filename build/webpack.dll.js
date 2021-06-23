
const {dllPath, dllManifestPath} = require('./paths');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {DllPlugin} = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    vendors: ['react', 'react-dom', 'classnames', '@icon-park/react', 'react-transition-group']
  },
  output: {
    filename: '[name].dll.js',
    path: dllPath,
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      name: '[name]',
      path: dllManifestPath
    })
  ]
}