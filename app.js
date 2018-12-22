const http = require('http');
const express = require('express');
const axios = require('axios');
const stringify = require('json-stringify-safe')
require('dotenv').config()

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
const API_URL = `https://api.github.com/orgs/${process.env['ORGANIZATION_NAME']}`;
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];
let CURRENT_BLOCK = 1;

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

function getBlockInfo(gitResponse) {
  let currentBlock = null;
  let currentBlockSize = null;
  let totalUploaded = 0;

  // Getting current block
  const pattern = new RegExp(/[.b]\d+/);
  gitResponse.data.forEach(repo => {
    if (pattern.test(repo.name)) {
      const blockNum = repo.name.substring(1);
      totalUploaded += repo.size;

      if (!currentBlock) {
        currentBlock = blockNum;
        currentBlockSize = repo.size;
      } else {
        if (blockNum > currentBlock) {
          currentBlock = blockNum;
          currentBlockSize = repo.size;
        }
      }

    }
  });
  return {
    currentBlock: parseInt(currentBlock),
    currentBlockSize,
    totalUploaded
  };
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Getting once on client loading
app.post('/initialInfo', (req, res) => {
  res.send({
    FILES_LIMIT: FILES_LIMIT,
    MAX_FILE_SIZE_MB: parseInt(process.env['MAX_FILE_SIZE_MB']),
    ORGANIZATION_NAME: process.env['ORGANIZATION_NAME']
  });
});

// Getting from stats block on client
app.post('/stats', async (req, res) => {

  axios.get(`${API_URL}/repos?access_token=${GITHUB_TOKEN}`)
  .then(gitResponse => {
    const blockInfo = getBlockInfo(gitResponse);

    const {currentBlock} = blockInfo;
    const {currentBlockSize} = blockInfo;

    const {totalUploaded} = blockInfo;

    res.send(stringify({
      currentBlock,
      currentBlockSize,
      maxBlockSize: parseInt(process.env['BLOCK_SIZE_MB']),
      totalUploaded,
      gitResponse: gitResponse
    }));
  })
  .catch(function (error) {
    console.log(error);
  });
  
});

// Applying custom upload handler
const upload = multer({ storage: storage })

app.post('/upload', upload.array('somefiles', FILES_LIMIT), (req, res) => {

  const file_uploads = req.files.reduce(
    (load, file) => load.then(async (urls) => {
      console.log("File was saved at:", file.path);

      const file_url = await uploadToGithub(`b${CURRENT_BLOCK}`, file.path);

      return [ ...urls, file_url ];
    }),
    Promise.resolve([])
  );

  file_uploads
    .then(links => res.send(links))
    .catch(err => res.status(500).json(err.message));
});

/**
 * Initialization
 */ 
axios.get(`${API_URL}/repos?access_token=${GITHUB_TOKEN}`)
.then(gitResponse => {
  const blockInfo = getBlockInfo(gitResponse);
  CURRENT_BLOCK = blockInfo.currentBlock;

  server.listen(port, () => {
    console.log(`App is open on port ${port}`);
    console.log(`Current working block is ${CURRENT_BLOCK}`);
  });
  
});
