// webpack-dev-server configuration
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var config = require('./config.js');

var bundleStart = null;
var compiler = webpack(webpackConfig);
// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function() {
	console.log('Bundling...');
	bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function() {
	console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

var wds = new WebpackDevServer(compiler, {
	publicPath: '/assets/',
	filename: 'bundle.js',
	contentBase: "http://localhost/",
	watchOptions:{
		aggregateTimeout: 300,
		poll: true
	},
	// Configure hot replacement
	hot: true,
	// The rest is terminal configurations
	quiet: false,
	noInfo: false,
	stats: {
	  colors: true
	},
	historyApiFallback: true,
	proxy: {
		'*': 'http://localhost:' + config.serverPort,	
	}
}).listen(config.wdsPort, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Webpack dev server listening at localhost:' + config.wdsPort);
});
