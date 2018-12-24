/**
 * Functions to work with GitHub
 */

const axios = require('axios');

const uploadToGithub = require('./upload')

const token = process.env['GITHUB_TOKEN'];
const API_URL = `https://api.github.com/orgs/${process.env['ORGANIZATION_NAME']}`;

// Stores all created blocks at GitHub
let createdBlocks = [];

// Run once at server initialization
function connectToGitHub() {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/repos?access_token=${token}`)
    .then(gitResponse => {
      const blockInfo = getBlockInfo(gitResponse);
      const currentBlock = blockInfo.currentBlock;

      resolve({
        currentBlock
      });
    })
    .catch(error => {
      console.log(error);
      reject('🛑 Error connecting to GitHub');
    });
  });
}

// Run on POST /stats
function getStats() {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/repos?access_token=${token}`)
    .then(gitResponse => {
      const blockInfo = getBlockInfo(gitResponse);

      // const {currentBlock} = blockInfo;
      const currentBlock = 47;
      const {currentBlockSize} = blockInfo;

      const {totalUploaded} = blockInfo;

      resolve({
        currentBlock,
        currentBlockSize,
        maxBlockSizeMB: parseInt(process.env['BLOCK_SIZE_MB']),
        totalUploaded,
      });
    })
    .catch(error => {
      console.log(error);
      reject('🛑 Unable to get stats from GitHub');
    });
  });
}

function createBlock(blockNum) {
  blockNum = parseInt(blockNum);

  console.log('Creating block', blockNum);
  const DATA = {
    name: `b${blockNum}`,
    description: `Block ${blockNum}`,
    homepage: "https://morejust.store/",
    private: false,
    has_issues: false,
    has_projects: false,
    has_wiki: false,
    license_template: "unlicense"
  };

  return new Promise((resolve, reject) => {
    axios.post(`https://api.github.com/orgs/morejust/repos?access_token=${token}`, DATA)
    .then(response => {
      createdBlocks.push(blockNum);

      resolve('✅ Block was created');
    })
    .catch(error => {
      reject("⚠️ Block was not created");
    });
  }); 
}

// UNABLE BECAUSE OF LACK OF PERMISSIONS
// JUST LEAVE FOR NOW< NO NEED TO DELETE REPO
function deleteBlock(number) {
  console.log('Deleting block', number);

  axios.delete(`https://api.github.com/repos/morejust/b${blockNum}?access_token=${token}`)
  .then(response => {
    console.log(response);
    console.log('Repo was deleted');
  })
  .catch(error => {
    console.log(error);
    console.log('Error while deleting repo');
  });
}

function getBlockInfo(gitResponse) {
  const maxBlockSizeMB = process.env['BLOCK_SIZE_MB'];
  let currentBlock = null;
  let currentBlockSize = null;
  let totalUploaded = 0;

  // Getting current block
  const pattern = new RegExp(/[.b]\d+/);
  gitResponse.data.forEach(repo => {

    // Going through each block
    if (pattern.test(repo.name)) {
      const blockNum = parseInt(repo.name.substring(1));

      // Appending block to createdBlocks array
      !createdBlocks.includes(blockNum) ? createdBlocks.push(blockNum) : null;

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

function uploadFiles(files, workingBlock) {
  return files.reduce(
    (load, file) => load.then(async (urls) => {
      console.log("File was saved at:", file.path);

      const file_url = await uploadToGithub(`b${workingBlock}`, file.path);

      return [ ...urls, file_url ];
    }),
    Promise.resolve([])
  );
}

module.exports = {
  connectToGitHub,
  getStats,
  uploadFiles
};