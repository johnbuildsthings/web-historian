var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelper = require('../web/http-helpers')
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', function(err, data){
    console.log('data', data);
    if(err){
      console.log('error in readListOfUrls: ', err);
      return err;
    }
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(data) {
    if(data.indexOf(url) > -1){
      callback(true);
    } else {
      callback(false);  
    }
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, '\n' + url, function(err){
    if(err){
      console.log('error in addUrlToList: ', err.message);
      callback(false);
    }
    callback(true);
  });
};

exports.isUrlArchived = function(pathname, callback){
  fs.readFile(exports.paths.archivedSites + '/' + pathname, 'utf-8', function(err, data) {
    callback(err, data);
  });

};

exports.downloadUrls = function(dataArray, callback){
  dataArray.forEach(function(url){
    exports.isUrlArchived(url, function(err, data){
      if(err){
        httpHelper.sendHttpRequest({host: url}, function(data){
          fs.writeFile(exports.paths.archivedSites+'/'+url, data, 'utf-8', function(){
            console.log('site archived, ', url);
            if (callback) {
              callback();
            }
          });
        });
      }
    });
  });
}






























