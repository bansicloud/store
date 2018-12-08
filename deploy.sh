git branch heroku-deploy
git checkout heroku-deploy
git fetch
git rebase master
npm run build-front
git add client/build
git commit --allow-empty -m "build heroku"
git push --force --set-upstream origin heroku-deploy
git checkout master
