var path = require('path');
var autoprefixer = require('autoprefixer-core');
var Webpack = require('webpack');

var host = process.env.APP_HOST || 'localhost';
var config = require('./config.js');

var entryPath = path.resolve(__dirname, 'frontend', 'index.js');
var assetsPath = path.resolve(__dirname, 'public', 'assets');
var srcPath = path.resolve(__dirname, 'frontend');

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [
    // For hot style updates
    'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://' + host + ':' + config.wdsPort,
    // The js
    entryPath
  ],
  output: {
      publicPath: 'http://' + host + ':' + config.wdsPort + '/assets/',
      path: assetsPath,
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?presets[]=es2015'],
        include: srcPath
        // exclude: /(node_modules|bower_components|bundle.js|test)/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        include: srcPath
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less',
        include: srcPath
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: srcPath
      },      
      // the url-loader uses DataUrls. 
      // the file-loader emits files. 
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: srcPath
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
};