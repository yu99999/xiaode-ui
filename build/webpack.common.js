
const isEnvProduction = process.env.NODE_ENV === 'production'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


const {
  entryPath,
  outputPath,
  appHtml,
  faviconPath,
  alias,
  publicPath
} = require('./paths')

const getStyleLoader = (loader) => {
  return [
    isEnvProduction 
    ? MiniCssExtractPlugin.loader
    : 'style-loader',
    // "cache-loader",       // 根据自己需要是否开启缓存css
    {
      loader: 'css-loader',
      options: {
        importLoaders: loader ? 2 : 1
      }
    },
    loader ? `${loader}-loader` : false,
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')
        ]
      }
    }
  ].filter(Boolean)
}


module.exports = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
    publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appHtml,
      filename: 'index.html',
      favicon: faviconPath,
      publicPath
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),   // 将 public 目录下的文件都复制到打包文件夹中
        ignore: ['index.html', 'favicon.ico']
      }
    ])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    mainFiles: ['index']
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_moudles/,
        use: [
          // {
          //   loader: "thread-loader",      // 开启多进程多实例构建，提升构建速度
          //   options: {
          //     workers: 3    // 开启3个进程
          //   }
          // },
          "ts-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_moudles/,
        use: [
          {
            loader: "thread-loader",      // 开启多进程多实例构建，提升构建速度
            options: {
              workers: 3    // 开启3个进程
            }
          },
          "babel-loader?cacheDirectory=true"    // 开启缓存，提升二次打包速度
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,      // 图片路径有可能是 .jpg?xxxxx
        loader: 'url-loader',
        options: {
          limit: 10240,  // 10k
          name: 'static/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,      // 媒体文件
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10240,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
        sideEffects: true,
      },
      {
        test: /\.less$/,
        use: getStyleLoader('less'),
        sideEffects: true,
      },
      {
        test: /\.scss$/,
        use: getStyleLoader('sass'),
        sideEffects: true,
      }

    ]
  }
}
