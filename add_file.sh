# Adds a new file to repo

# First argument - repo path
REPOPATH=$1

# Second argument - file-to-add path
FILEPATH=$2
FILENAME=$(basename $FILEPATH)
REPONAME="b1"

# Maybe this should be replaced for non macOS systems:
# md5 -> md5sum
HASHEDFILEPATH=$(echo -n $FILEPATH| md5 | awk '{print $1}')
BRANCHNAME=$HASHEDFILEPATH

CURRENTDIR=$(pwd)

cd $REPOPATH

# trying to clone repo
echo git clone https://ohld:$GITHUB_TOKEN@github.com/morejust/$REPONAME.git
git clone https://ohld:$GITHUB_TOKEN@github.com/morejust/$REPONAME.git

cd $REPONAME
mv $FILEPATH ./

# Checkout to the very first repo commit
git checkout `git rev-list --max-parents=0 HEAD | tail -n 1`

git checkout -b $BRANCHNAME
git add .
git commit -m "add $FILENAME to $BRANCHNAME branch"
git push --set-upstream origin $BRANCHNAME

# check if succeeded

# Finishing
# revert to commit
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$REPONAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
