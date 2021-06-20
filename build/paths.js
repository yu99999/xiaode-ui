const path = require('path')

const isEnvProduction = process.env.NODE_ENV === 'production'

const resolveApp = relativePath => path.resolve(__dirname, '../', relativePath)

module.exports = {
  entryPath: resolveApp('src/index.tsx'),
  outputPath: resolveApp('dist'),
  appHtml: resolveApp('public/index.html'),
  faviconPath: resolveApp('public/favicon.ico'),
  alias: resolveApp('src'),
  dllPath: resolveApp('dll'),
  dllManifestPath: resolveApp('dll/vendors.manifest.json'),
  publicPath: isEnvProduction ? '' : '/'      // 环境不同生成不同的前缀
}
