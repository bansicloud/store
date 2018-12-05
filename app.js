const http = require('http');
const express = require('express');

const multer  = require('multer')
const path = require('path');
const { mkdir } = require('fs');

const uploadToGithub = require('./upload')

const app = express();
const server = http.createServer(app);

// Constants
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, './public');
const FILES_LIMIT = 3;

app.use(express.static(publicPath));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Custom function to handle uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir(path.join(__dirname + '/uploads'), () => {
      cb(null, path.join(__dirname + '/uploads'));
    });
  },
  filename: function (req, file, cb) {
    // Get extention of uploaded file
    const extension = path.parse(file.originalname).ext;
    console.log('received');

    // Save file using format
    cb(null, 'file-' + Date.now() + extension);
  }
});

// Applying custom upload handler
const upload = multer({ storage: storage })


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', upload.array('somefiles', FILES_LIMIT), (req, res) => {

  // Total files received
  const totalFiles = req.files.length;

  const file_uploads = req.files.map((file) => {
    // Going through each uploaded file

    const fileName = file.filename;

    // Receiving file path on local machine
    const filePath = file.path;
    const repoPath = '.';

    console.log("File was saved at:", filePath);
    console.log("Repo path:", repoPath);

    const file_url = uploadToGithub(file.path);

    return file_url
  });

  Promise.all(file_uploads)
    .then(links => res.send(links))
    .catch(err => res.status(500).json(err.message));
});

server.listen(port, () => {
  console.log(`App is open on port ${port}`);
});
