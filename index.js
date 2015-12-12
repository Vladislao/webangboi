'use strict';

var http = require('http');
var config = require('./config');
var app = require('./backend/app.js');

http.createServer(app).listen(config.serverPort, function (err, result){
  if(err){
    console.log(err);
  }
  console.log('Connect server listening at localhost:' + config.serverPort);
});