var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

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

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets['GITHUB_TOKEN']
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  JSON.parse(result).forEach(function(element) {
    downloadImageByURL(element["avatar_url"], './avatars/' + element["login"] + '.jpg');
  })
});