var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');
exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode);
  response.end(data);
}

exports.sendHttpRequest = function(option, callback){
  option.port = option.port || 80;
  option.path = option.path || '/';
  if(!option.host){
    console.log('provide url');
  }
  http.get(option, function(response){
    var data = '';
    response.on('data', function(chunk){
      data += chunk;
    });
    response.on('end', function(){
      callback(data);
    });
    response.on('error', function(e){
      console.log(e.message);
    });
  });
}

exports.serveAssets = function(res, asset, callback) {
  fs.readFile( asset, function( err, data) {
    if(err) {
      console.log(err.message);
    }
    exports.sendResponse(res, data);
  });
};


// As you progress, keep thinking about what helper functions you can put here!
