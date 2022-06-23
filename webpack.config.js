const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')  // 执行时间分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin     // 构建结果分析
// const smp = new SpeedMeasurePlugin()
console.log('process.env.NODE_ENV=', process.env.NODE_ENV)

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: path.join(__dirname, 'src/js/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '~': resolve('src'),
      '@': resolve('src'),
      'components': resolve('src/components'),
      crypto: false
    },

    // 1. 高频文件后缀名放前面；
    // 2. 手动配置后，默认配置会被覆盖
    // extensions: ['.js', '.json'] // 引入模块时不带扩展名, 左到右的顺序去尝试解析模块 

    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpe?g|png|gif|mp3)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage', //不能是“entry”
              corejs: 3
            }]]
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'src/assets'),
        to: './assets'
      }]
    }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
    //   // generateStatsFile: true, // 是否生成stats.json文件
    // })
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    // open:true  // 是否自动打开浏览器
  }
}

module.exports = (env, argv) => {
  console.log('argv.mode', argv.mode)
  // return smp.wrap(config)
  return config
}