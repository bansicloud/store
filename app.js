const express = require('express')
const multer  = require('multer')
const path = require('path');
const exec = require('child_process').exec;

const app = express();

// Constants
const FILES_LIMIT = 3;

// Custom function to handle uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/uploads'));
  },
  filename: function (req, file, cb) {
    // Get extention of uploaded file
    const extension = path.parse(file.originalname).ext;

    // Save file using format
    cb(null, 'file-' + Date.now() + extension);
  }
});

// Applying custom upload handler
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Handling POST request with uploaded files
app.post('/upload', upload.array('somefiles', FILES_LIMIT), function (req, res, next) {

  // Going through each uploaded file
  for (i in req.files) {
    const file = req.files[i];
    
    const fileName = file.filename;

    // Receiving file path on local machine
    const filePath = file.path;
    const repoPath = '/Users/viktorkirillov/projects/store/b1';
    let result;

    console.log("File was saved at:", filePath);
    console.log("Repo path:", repoPath);

    // NOW WE CAN LAUNCH BASH SCRIPT TO UPLOAD SINGLE FILE
    // ..

    var script = exec(`sh add_file.sh ${repoPath} ${filePath}`);
    
    script.stdout.on('data', (data) => {
      if (data.includes('raw.githubusercontent.com')) {
        // console.log(typeof(data));
        result = data;
      }
    }); 

    script.stdout.on('end', () => {
      res.send(result);
    })

  };
  
});

app.listen(3000, () => {
  console.log('App is open on port 3000');
});