# [Morejust.store](https://morejust.store) :briefcase: [![Build Status](https://travis-ci.org/morejust/store.svg?branch=master)](https://travis-ci.org/morejust/store)
Create your own free unlimited cloud storage! Our tool uses GitHub-as-a-storage to save there the uploaded files. You can use [our deployed tool](https://morejust.store) or run it by yourself - see below for instructions.

## How to deploy

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/morejust/store/tree/heroku-deploy)

*TL;DR: you need to create a GitHub token and add it to deployed repo as GITHUB_TOKEN environment variable.* 


### Step-by-step guide

#### :one: Create GitHub token
1. Register on GitHub and go to [Settings -> Developer Settings -> Personal Access Tokens -> Generate new token](https://github.com/settings/tokens/new)
2. Give it a random name, select **public repo** and scroll below and smash **Generate**. You don't have to add any additional rights if you want to store your files on public repositories.
<img src="https://raw.githubusercontent.com/morejust/b1/479c307d68d1181384cbe76e9efcb3d4/Screenshot%202018-12-27%20at%2014.40.19.png" height="300">
3. Copy generated GitHub token and go to the next part: deployment.

#### :two: Deploy to Heroku

Heroku allows to create free small machines and deploy from GitHub in one click. You will need to have a Heroku account to proceed, so please [register](https://signup.heroku.com/login).

1. Press the button below to deploy with one click

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/morejust/store/tree/heroku-deploy)

2. Choose any app name you like
<img src="https://raw.githubusercontent.com/morejust/b1/42a511ba90df5a626ea96e6cf6c57110/Create-heroku.png" height="300">

3. Click the 'Manage App' at the bottom of the page
<img src="https://raw.githubusercontent.com/morejust/b1/7790f98de2a92ee21760a1a6d12c7245/Screenshot 2018-12-26 at 01.41.08.png" height="300">

4. Click 'Settings' and 'Reveal Config Vars'
<img src="https://raw.githubusercontent.com/morejust/b1/b356163d4f0641d78f5774ff7a690481/Screenshot 2018-12-26 at 01.45.17.png" height="300">

5. Set the *key* to **GITHUB_TOKEN** and the *value* to the generated on the previous steps GitHub token.

<img src="https://raw.githubusercontent.com/morejust/b1/c6452fd43adee07505a006a5c4b3bfcb/Screenshot%202018-12-26%20at%2002.20.27.png" height="300">

6. Smash 'Open app' and enjoy!

---

#### Run Client & Server locally

If you don't like . Heroku, you can deploy manually. 

``` bash
git clone https://github.com/morejust/store
```

Start server:
``` bash
npm run dev
```

Start client:
``` bash
cd client
npm start
```

## All Environment Variables

Here is the list of all possible config variables that can be changed (except **GITHUB_TOKEN** that is required and was set earlier). If you decide to use this config variables, you should specify them as environment variables.

1. **BLOCK_SIZE_MB** - max block (github repo) size. Default value = 1000
2. **MAX_FILE_SIZE_MB** - max file size that can be uploaded. Default value = 100
3. **ORGANIZATION_NAME** - used to create blocks in the organization Github account, not in your private account. Default value - not set.
4. **IS_PRIVATE** - create private repos to have private storage. Default value = False

## Technical details

### HEROKU DEPLOY

To use this `heroku-deploy` branch:

```bash
git checkout heroku-deploy
git fetch
git reset --hard origin/master
npm run build-front
git add client/build
git commit --allow-empty -m "build heroku"
git push --force
git checkout master
```

or simply

```bash
npm run deploy
```

### How to use add_file.sh script

From any folder you can launch:

``` bash
bash add_file.sh $NAME_OF_bLOCK_REPO $AbSOLUTE_PATH_TO_FILE
```

Keep in mind that you should have a push access to the repository. If you want to create a new repo for files (we call it 'block'), you should have the rights to create a new repo.
