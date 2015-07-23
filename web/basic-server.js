var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParse = require('url');
// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";

var paths = {
  '/': function(request, response){
    handler.getRequestHandler(request, response)
  },


};


var server = http.createServer(function(request, response){

  console.log('received a ' + request.method + ' request');
  

  if(request.method === 'GET') {
    handler.getRequestHandler( request, response )
  }  else if (request.method === 'POST') {
    handler.postRequestHandler( request, response )
  }


  // if(address){
  //   //address(request, response);
  //   handler.handleRequest(request, response);
  // }else{
  //   response.writeHead(404);
  //   response.end('failed');
  // }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

