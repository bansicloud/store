const { exec } = require('child_process');
const repoPath = process.env.REPO_PATH || '.';

module.exports = (filePath) => new Promise(resolve => {
  // NOW WE CAN LAUNCH BASH SCRIPT TO UPLOAD SINGLE FILE
  const script = exec(`sh add_file.sh ${repoPath} ${filePath}`);

  script.stdout.on('data', (data) => {
    console.log('sh:', data)
    
    // resolve with a github link
    if (data.includes('raw.githubusercontent.com')) {
      data = data.replace(/\n/g, '');
      resolve(data);
    };
  });
});
