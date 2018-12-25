const { exec } = require('child_process');
const repoPath = process.env.REPO_PATH || 'blocks/';  // TODO: move to global constant

module.exports = (blockName, filePath) => new Promise((resolve, reject) => {
  let isResolved = false
  // NOW WE CAN LAUNCH BASH SCRIPT TO UPLOAD SINGLE FILE
  const script = exec(`bash add_file.sh ${blockName} "${filePath}"`);

  script.stdout.on('data', (data) => {
    console.log('sh:', data)

    // resolve with a github link
    if (data.includes('raw.githubusercontent.com')) {
      data = data.replace(/\n/g, '');
      resolve(data);
      isResolved = true;
    };

    if (data.includes('ERROR: Upload failed.')) {
      // check error type here
      // reject({ error: 'unknown error' })

      // for now, let's always think the problem is free space
      // BUT
      // TODO: check if that's a connection error (e.g. when no internet access)
      reject({ error: 'no free space' })
      isResolved = true;
    }
  });

  script.stderr.on('data', (data) => {
    console.log('sh err:', data)
  })

  script.on('exit', (code, signal) => {
    if (!isResolved) {
      reject({ code, signal, error: 'unknown error' })
    }
  })

});
