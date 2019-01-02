const http = require('http');
const express = require('express');
const stringify = require('json-stringify-safe')
require('dotenv').config()

const multer  = require('multer')
const path = require('path');
const { mkdir } = require('fs');
const cors = require('cors');

const { gitState, connectToGitHub, getStats, uploadFiles } = require('./repo');

const app = express();
const server = http.createServer(app);

// CONSTANTS
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, './client/build');
const FILES_LIMIT = 5;
const MAX_FILE_SIZE_MB = parseInt(process.env['MAX_FILE_SIZE_MB']) || 100;

app.use(cors());
app.use(express.static(publicPath));

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
    console.log('received', file.originalname);

    // Save file using format
    cb(null, file.originalname);
  }
});

// Applying custom upload handler
const upload = multer({ storage: storage })



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/initialInfo', (req, res) => {
  res.send({
    FILES_LIMIT: FILES_LIMIT,
    MAX_FILE_SIZE_MB: MAX_FILE_SIZE_MB
  });
});


app.post('/stats', async (req, res) => {
  getStats()
  .then(stats => {
    res.send(stringify(stats))
  });
});

app.post('/upload', upload.array('somefiles', FILES_LIMIT), (req, res) => {
  uploadFiles(req.files)
  .then(links => {
    res.send(links);
  })
  .catch(err => {
    res.status(500).json(err.message);
  });
});

app.post('/file', upload.array('file', FILES_LIMIT), (req, res) => {
  console.log(req.files);
  uploadFiles(req.files)
  .then(links => {
    res.send(links[0]);
  })
  .catch(err => {
    res.status(500).json(err.message);
  });
});

/**
 * Server Initialization
 */ 
connectToGitHub()
.then(() => {
  console.log(`[Server]: Working with ${gitState.blockLetter}${gitState.workingBlock}`);

  server.listen(port, () => {
    console.log(`[Server]: App is open on port ${port}`);
  });

});

