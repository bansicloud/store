# Adds a new file to repo

# First argument - repo path
REPOPATH=$1

# Second argument - file-to-add path
FILEPATH=$2
FILENAME=$(basename $FILEPATH)
REPONAME="b1"

# Maybe this should be replaced for non macOS systems:
# md5 -> md5sum
HASHEDFILEPATH=$(echo -n $FILEPATH| md5sum | awk '{print $1}')
BRANCHNAME=$HASHEDFILEPATH

CURRENTDIR=$(pwd)

cd $REPOPATH

# trying to clone repo

# if [ no directory $REPONAME ]; do
if [ ! -d "$REPONAME" ]; then
  echo git clone https://ohld:$GITHUB_TOKEN@github.com/morejust/$REPONAME.git
  git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$REPONAME.git
fi

cd $REPONAME

# Checkout to the very first repo commit
git checkout `git rev-list --max-parents=0 HEAD | tail -n 1`

git add .
git reset --hard origin/master
git checkout -b $BRANCHNAME

mv $FILEPATH ./

echo ls
ls

echo git status
git status

echo git add $FILENAME
git add $FILENAME

echo git commit -m "add $FILENAME to $BRANCHNAME branch"
git commit -m "add $FILENAME to $BRANCHNAME branch"

echo git push --set-upstream origin $BRANCHNAME
git push --set-upstream origin $BRANCHNAME

# check if succeeded

# Finishing
# revert to commit
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$REPONAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
