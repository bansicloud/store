# save local changes
if ! git diff-files --quiet
then
	LOCAL_CHANGES=true
	git stash
else
	LOCAL_CHANGES=false
fi

# update heroku-deploy branch
rm -rf client/build
git branch heroku-deploy
git checkout heroku-deploy

if [ -z $CI ]
then
	echo local
	git remote add upstream git@github.com:morejust/store.git
else
	echo ci
	git remote add upstream "https://$GITHUB_TOKEN@github.com/morejust/store.git"
fi

git fetch upstream
git reset --hard upstream/heroku-deploy

# take all files from master
git checkout master .
git add .
# except for the file which makes build dir ignored
git checkout heroku-deploy client/.gitignore

# build front and add to commit
npm run build-front
git add -f client/build

# commit
DATE=`date '+%Y-%m-%d %H:%M:%S'`
git commit --allow-empty -m "build heroku $DATE"

# send updates to branch
echo push
git push --set-upstream upstream heroku-deploy


# restore local state
git reset --hard
git checkout master

if $LOCAL_CHANGES
then
	git stash pop
fi
