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

mv $FILEPATH $REPOPATH

CURRENTDIR=$(pwd)
cd $REPOPATH

# Checkout to the very first repo commit 
git checkout `git rev-list --max-parents=0 HEAD | tail -n 1`

git checkout -b $BRANCHNAME
git add $FILENAME
git commit -m "add $FILENAME to $BRANCHNAME branch"
git push --set-upstream origin $BRANCHNAME

# Finishing
# revert to commit
rm -f $FILENAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$REPONAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
