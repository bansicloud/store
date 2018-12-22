const { exec } = require('child_process');
const repoPath = process.env.REPO_PATH || 'blocks/';  // TODO: move to global constant

module.exports = (blockName, filePath) => new Promise(resolve => {
  // NOW WE CAN LAUNCH BASH SCRIPT TO UPLOAD SINGLE FILE
  const script = exec(`sh add_file.sh ${blockName} "${filePath}"`);

  script.stdout.on('data', (data) => {
    console.log('sh:', data)

    // resolve with a github link
    if (data.includes('raw.githubusercontent.com')) {
      data = data.replace(/\n/g, '');
      resolve(data);
    };
  });

  script.stderr.on('data', (data) => {
    console.log('sh err:', data)
  })
});
