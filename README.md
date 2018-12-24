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

Keep in mind that you should have a push access to the htt
