// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers')
var fs = require('fs');

archive.readListOfUrls(function(dataArray){
  fs.writeFile('test.txt', 'testing', function() {
    console.log('success');
  });
  
  archive.downloadUrls(dataArray, function(){
    process.exit(1);
  });

});