var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParse = require('url');
// require more modules/folders here!



exports.getRequestHandler = function (req, res) {
  
  var parts = urlParse.parse(req.url);
  if(parts.pathname === '/'){
    httpHelpers.serveAssets( res, (archive.paths.siteAssets + '/index.html') );
  }else{
    archive.isUrlArchived(parts.pathname, function(err, data){
      if (err) {
        httpHelpers.sendResponse(res, 'fail', 404);
      }else{
        httpHelpers.serveAssets(res, (archive.paths.archivedSites + parts.pathname));
      }
    });
  }
};

exports.postRequestHandler = function(req, res) {
  var data = '';

  req.on('data', function(chunk){
    data += chunk;
  });

  req.on('end', function(){
    archive.addUrlToList(JSON.parse(data).url);
    httpHelpers.sendResponse( res, 'added to the archive!!', 302);
  });

};
