'use strict';

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var config = require('./config');

var serverPort = process.env.PORT || config.port;
// connect server configuration

var app = connect();
app.use('/', serveStatic(__dirname + '/public'));

http.createServer(app).listen(serverPort, function (err, result){
  if(err){
    console.log(err);
  }
  console.log('Connect server listening at localhost:' + config.port);
});

// webpack-dev-server configuration

if(process.env.NODE_ENV !== 'production'){

	var webpack = require('webpack');
	var WebpackDevServer = require('webpack-dev-server');
	var webpackConfig = require('./webpack.config');
	
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

	new WebpackDevServer(compiler, {
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
			'*': 'http://localhost:' + serverPort,	
		}
	}).listen(config.wdsPort, 'localhost', function (err, result) {
	  if (err) {
	    console.log(err);
	  }
	  console.log('Webpack dev server listening at localhost:' + config.wdsPort);
	});
}