# save local changes
if ! git diff-files --quiet
then
	LOCAL_CHANGES=true
	git stash
else
	LOCAL_CHANGES=false
fi

# update heroku-deploy branch
git branch heroku-deploy
git checkout heroku-deploy
git fetch

# take all files from master
git checkout master .
git add .

# build front and add to commit
npm run build-front
git add -f client/build

# commit
DATE=`date '+%Y-%m-%d %H:%M:%S'`
git commit --allow-empty -m "build heroku $DATE"

# send updates to branch
if [ -z $CI ]
then
	echo push local
	git push --force --set-upstream origin heroku-deploy
else
	echo push ci
	git push --force --quiet "https://$GITHUB_TOKEN@github.com/morejust/store.git" master:heroku-deploy
fi

# restore local state
git checkout master

if $LOCAL_CHANGES
then
	git stash pop
fi

