const request = require('request');
const fs = require('fs');
const path = require('path');

// const API_URL = 'http://localhost:4000/file'; // Local EndPoint
const API_URL = 'https://morejust.herokuapp.com/file';

var r = request.post(API_URL, function optionalCallback (err, httpResp, fileLink) {
  if (err) {
    return console.error('Upload failed:', err);
  }
  console.log('Upload successful! Link:', fileLink);
});
var form = r.form();

// To load file from current folder
form.append('file', fs.createReadStream(path.join(__dirname, 'image.png')));

// To load file anywhere from computer
// form.append('file', fs.createReadStream('/Users/viktorkirillov/Documents/GitHub/store/image.png'));