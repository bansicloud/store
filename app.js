const http = require('http');
const express = require('express');

const multer  = require('multer')
const path = require('path');
const exec = require('child_process').exec;
const { mkdir } = require('fs');

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
  let links = [];

  // Going through each uploaded file
  for (i in req.files) {
    const file = req.files[i];
    const fileName = file.filename;

    // Receiving file path on local machine
    const filePath = file.path;
    const repoPath = '/Users/viktorkirillov/projects/store/b1';

    console.log("File was saved at:", filePath);
    console.log("Repo path:", repoPath);

    // NOW WE CAN LAUNCH BASH SCRIPT TO UPLOAD SINGLE FILE
    var script = exec(`sh add_file.sh ${repoPath} ${filePath}`);
    
    script.stdout.on('data', (data) => {

      // Adding github link to array
      if (data.includes('raw.githubusercontent.com')) {
        data = data.replace(/\n/g, '');
        links.push(data);
      };
    }); 
  };

  // Checking for links to be generated
  const interval = setInterval(() => {

    // Send responce to user
    if (links.length === totalFiles) {
      clearInterval(interval);
      res.send(links);
    }
  }, 100);

});

server.listen(port, () => {
  console.log(`App is open on port ${port}`);
});


