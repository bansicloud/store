# store

## Run Client & Server locally

To run and test how it works on local computer, clone this repo.

Start server:
```bash
npm run dev
```

Start client:
```bash
cd client
npm start
```

## Environment Variables you can & HAVE TO use:

**GITHUB_TOKEN** - token from GitHub. **Required!**

Not required:
**BLOCK_SIZE_MB** - max block (github repo) size. Default value = 1000
**MAX_FILE_SIZE_MB** - max file size that can be uploaded. Default value = 100
**ORGANIZATION_NAME** - used to create blocks in the organization, not in personal account. Default value - not set.
**IS_PRIVATE** - create private repos to have private storage. Default value = False

## HEROKU DEPLOY

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

## How to use add_file.sh script

From any folder you can launch:

``` bash
bash add_file.sh $PATH_TO_REPO_FOLDER $PATH_TO_FILE
```

Keep in mind that you should have a push access to the http
