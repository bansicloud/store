const http = require('http');
const express = require('express');

const multer  = require('multer')
const path = require('path');
const { mkdir } = require('fs');

const cors = require('cors');
const corsOptions = {
  origin: 'https://morejust.store',
};

const uploadToGithub = require('./upload')

const app = express();
const server = http.createServer(app);

// Constants
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, './client/build');
const FILES_LIMIT = 5;

app.use(cors(corsOptions));
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

// Getting once on client loading
app.post('/initialInfo', (req, res) => {
  res.send({
    FILES_LIMIT: FILES_LIMIT
  });
});

// Getting from stats block on client
app.post('/stats', (req, res) => {

  // Launc stats script

  const currentBlock = 1;
  const currentBlockSize = 140;
  const maxBlockSize = 500;

  const totalUploaded = 647;
  res.send({
    currentBlock,
    currentBlockSize,
    maxBlockSize,
    totalUploaded
  })
});

app.post('/upload', upload.array('somefiles', FILES_LIMIT), (req, res) => {

  const file_uploads = req.files.reduce(
    (load, file) => load.then(async (urls) => {
      console.log("File was saved at:", file.path);

      const file_url = await uploadToGithub(file.path);

      return [ ...urls, file_url ];
    }),
    Promise.resolve([])
  );

  file_uploads
    .then(links => res.send(links))
    .catch(err => res.status(500).json(err.message));
});

server.listen(port, () => {
  console.log(`App is open on port ${port}`);
});
