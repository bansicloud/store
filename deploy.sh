git branch heroku-deploy
git checkout heroku-deploy
git fetch
git rebase master
npm run build-front
git add client/build
git commit --allow-empty -m "build heroku"
# git push --force --set-upstream origin heroku-deploy
git push --force --quiet "https://$GITHUB_TOKEN@github.com/morejust/store" heroku-deploy > /dev/null 2>&1
git checkout master
