/**
 * Functions to work with GitHub
 */

const axios = require('axios');

const uploadToGithub = require('./upload')

const token = process.env['GITHUB_TOKEN'];
const orgName = process.env['ORGANIZATION_NAME'];
const API_URL = `https://api.github.com/orgs/${process.env['ORGANIZATION_NAME']}`;

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
  return new Promise((resolve, reject) => {

    getRepoInfo().then(info => {
      resolve({
        currentBlock: gitState.workingBlock,
        currentBlockSize: info.currentBlockSize,
        maxBlockSizeMB: parseInt(process.env['BLOCK_SIZE_MB']),
        totalUploaded: info.totalUploaded
      });
    });
  });
}

function getRepoInfo() {
  let currentBlock = null;
  let currentBlockSize = null;
  let totalUploaded = 0;

  return new Promise(resolve => {
    getAllBlocks()
    .then(blocks => {
      Object.keys(blocks).forEach(blockName => {
        const block = blocks[blockName];
        // const blockNum = parseInt(blockName.substring(1));

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
    axios.post(`https://api.github.com/orgs/${orgName}/repos?access_token=${token}`, DATA)
    .then(response => {
      console.log('✅ Block was created');
      resolve('✅ Block was created');
    })
    .catch(error => {
      reject("⚠️ Block was not created");
    });
  }); 
}

function deleteBlock(number) {
  console.log('Deleting block', number);

  axios.delete(`https://api.github.com/repos/${orgName}/b${blockNum}?access_token=${token}`)
  .then(response => {
    console.log(response);
    console.log('Repo was deleted');
  })
  .catch(error => {
    console.log(error);
    console.log('Error while deleting repo');
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

      // Object.keys(blocks).forEach(blockName => {
      //   console.log(blockName, hasEnoughSpace(blocks[blockName]));
      // });
    });
  });
}

// Returns True if we can use block for uploads, otherwise - False
function hasEnoughSpace(block) {
  const maxBlockSizeMB = process.env['BLOCK_SIZE_MB'];
  const maxFileSizeMB = process.env['MAX_FILE_SIZE_MB'];

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

function uploadFiles(files) {
  return files.reduce(
    (load, file) => load.then(async (urls) => {
      console.log("[uploadFiles]: File was saved at:", file.path);

      const file_url = await uploadToGithub(`b${gitState.workingBlock}`, file.path);

      return [ ...urls, file_url ];
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