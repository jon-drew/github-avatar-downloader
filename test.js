var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)

  .on('error', function (err) {
         if (err) throw err;
        console.log('Response Status Code:', response.statusCode);
       })

  .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Message: ', response.statusMessage);
         console.log('Content Type: ', response.headers['content-type']);
       })

  .pipe(fs.createWriteStream(filePath));
}

console.log(downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg"))