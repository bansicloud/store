git branch heroku-deploy
git checkout heroku-deploy
git fetch
git rebase master
npm run build-front
git add -f client/build
git commit --allow-empty -m "build heroku"
# git push --force --set-upstream origin heroku-deploy
git push --force --quiet "https://$GITHUB_TOKEN@github.com/morejust/store.git" master:heroku-deploy
git checkout master
