/**
 * Functions to work with GitHub
 */

const axios = require('axios');

const uploadToGithub = require('./upload')

const token = process.env['GITHUB_TOKEN'];
const maxBlockSizeMB = parseInt(process.env['BLOCK_SIZE_MB']) || 1000;
const maxFileSizeMB = parseInt(process.env['MAX_FILE_SIZE_MB']) || 50;
let API_URL;

if (process.env['ORGANIZATION_NAME']) {
  API_URL = `https://api.github.com/orgs/${process.env['ORGANIZATION_NAME']}`;
} else {
  API_URL = "https://api.github.com/user";
}


// Global state
const gitState = {
  workingBlock: 0
}

// Run once at server initialization
function connectToGitHub() {
  return new Promise((resolve, reject) => {
    switchToNextBlock()
    .then(() => {
      console.log('[connectToGithub]: New working block is', gitState.workingBlock);
      resolve();
    })
    .catch(error => {
      console.log(error);
      reject();
    })
  });
}

// Run on POST /stats
function getStats() {
  return getRepoInfo().then(info => ({
    currentBlock: gitState.workingBlock,
    currentBlockSize: info.currentBlockSize,
    maxBlockSizeMB: maxBlockSizeMB,
    totalUploaded: info.totalUploaded
}));
}

function getRepoInfo() {
  let currentBlockSize = null;
  let totalUploaded = 0;

  return new Promise(resolve => {
    getAllBlocks()
    .then(blocks => {
      Object.keys(blocks).forEach(blockName => {
        const block = blocks[blockName];
        totalUploaded += block.size;
      });

      currentBlockSize = blocks['b' + gitState.workingBlock].size;

      resolve({
        currentBlockSize,
        totalUploaded
      });
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
    axios.post(`${API_URL}/repos?access_token=${token}`, DATA)
    .then(response => {
      console.log('✅ Block was created');
      resolve('✅ Block was created');
    })
    .catch(error => {
      reject("⚠️ Block was not created");
    });
  });
}

function switchToNextBlock() {
  return new Promise((resolve, reject) => {
    getAllBlocks()
    .then(blocks => {
      let needToCreateThisBlock = false;

      // Just for test
      // blocks['b1'].size = 1000000;
      // blocks['b2'].size = 1000000;
      // blocks['b3'].size = 1000000;
      // blocks['b4'].size = 1000000;

      // Selecting next working block
      let nextBlock = gitState.workingBlock;
      while (true) {
        nextBlock += 1;

        // If block exists
        const selectedBlock = blocks['b' + nextBlock];
        if (selectedBlock) {

          if (hasEnoughSpace(selectedBlock)) {
            console.log('[SwitchBlocks]: Selecting block', nextBlock);
            gitState.workingBlock = nextBlock;
            break;
          } else {
            console.log('[SwitchBlocks]: Block', nextBlock, 'is full');
          }
        } else {
          console.log('[SwitchBlocks]: Need to create b', nextBlock);
          gitState.workingBlock = nextBlock;
          needToCreateThisBlock = true;
          break;
        }
      }

      if (needToCreateThisBlock) {
        createBlock(nextBlock)
        .then(() => {
          resolve('✅ New working block selected');
        })
        .catch((error) => {
          console.log(error);
          reject('🛑 Error in selecting next block');
        })
      } else {
        resolve('✅ New working block selected');
      }
    });
  });
}

// Returns True if we can use block for uploads, otherwise - False
function hasEnoughSpace(block) {
  return block.size < (maxBlockSizeMB - maxFileSizeMB) * 1000;
}

// Returns Object with all block {'b1': repo}
function getAllBlocks() {
  return new Promise((resolve, reject) => {
    let blocks = {};

    axios.get(`${API_URL}/repos?access_token=${token}`)
    .then(gitResponse => {

      // Going through each repo
      const pattern = new RegExp(/[.b]\d+/);
      gitResponse.data.forEach(repo => {

        // It this repo is block
        if (pattern.test(repo.name)) {
          blocks[repo.name] = repo;
        }
      });

      resolve(blocks);
    })
    .catch(error => {
      console.log(error);
      reject('🛑 Unable to get All Blocks from GitHub');
    });
  });
}

function uploadToCurrentBlock(filePath) {
  return uploadToGithub(`b${gitState.workingBlock}`, filePath);
}

async function uploadToNextBlock(filePath) {
  console.log('[uploadToNextBlock]:', '-> switching to next block')
  await switchToNextBlock()

  return await uploadToCurrentBlock(filePath)
}

async function upload(filePath) {
  console.log('[upload]:', 'uploading', filePath)

  try {
    console.log('[upload]:', '== trying upload to current block')

    return await uploadToCurrentBlock(filePath)
  } catch ({ error }) {
    if (error !== 'no free space') {
      console.error('[upload]:', 'xxx error:', error)
      throw error
    }

    console.log('[upload]:', '== trying upload to next block')

    return uploadToNextBlock(filePath)
  }
}

function uploadFiles(files) {
  return files.reduce(
    (load, file) => load.then(async (urls) => {
      console.log("[uploadFiles]: File was saved at:", file.path);

      try {
        const file_url = await upload(file.path);

        return [ ...urls, file_url ];
      } catch (err) {
        console.error("[uploadFiles]:", 'Error uploading file', file.path);
        console.error(err);

        return [ ...urls, '' ];
      }
    }),
    Promise.resolve([])
  );
}

module.exports = {
  gitState,
  connectToGitHub,
  getStats,
  uploadFiles
};
