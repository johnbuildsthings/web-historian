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
    var address = data.split('=')[1];
    archive.isUrlArchived(address, function(err, data){
      if(err){
        archive.addUrlToList( address, function(is){
          if (!is) {
            httpHelpers.sendResponse( res, 'failed to post request handler line 38ß', 500)
          }
          
          httpHelpers.serveAssets( res, archive.paths.siteAssets + '/loading.html');
      
        });
      }else{
        httpHelpers.serveAssets( res, archive.archivedSites + address, 302);
      }
    });

  });

};
