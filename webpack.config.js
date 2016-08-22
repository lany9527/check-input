var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //devtool: 'source-map',//配置生成Source Maps
  entry: {
    //path.join(__dirname, 'index.js'),
    common: ['jquery', 'bootstrap'],
    index: [
      path.join(__dirname, "/app/main.js")
    ]
  },
  //entry: __dirname + "/app/main.js",//入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "check-input.js"//打包后输出文件的文件名
  },
  externals: {
    'angular' : 'angular'
  },
  module: {//在配置文件里添加 loader
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-flow-strip-types',
            'transform-es2015-block-scoping',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'//添加对样式表的处理
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  devServer: {
    contentBase: "./",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    //port: 9000,
    hot: true
  },

};