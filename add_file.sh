# Adds a new file to repo

git config --global user.email "store@morejust.store"
git config --global user.name "Mr. Store"

# First argument - repo path
BLOCKS_FOLDER_PATH=$1
BLOCKNAME="b1"

# Second argument - file-to-add path
FILEPATH=$2
FILENAME=$(basename $FILEPATH)

CURRENTDIR=$(pwd)

# Maybe this should be replaced for non macOS systems:
# md5 -> md5sum

if [[ "$OSTYPE" == "darwin"* ]]; then
  BRANCHNAME=$(echo -n $FILEPATH| md5 | awk '{print $1}')
else
  BRANCHNAME=$(echo -n $FILEPATH| md5sum | awk '{print $1}')
fi

git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git $BLOCKS_FOLDER_PATH$BLOCKNAME

cd $BLOCKS_FOLDER_PATH
cd $BLOCKNAME
# Checkout to the very first repo commit
# git checkout `git rev-list --max-parents=0 HEAD | tail -n 1`

# git add .
# git reset --hard origin/master
git checkout -b $BRANCHNAME

mv $FILEPATH ./

# echo git add $FILENAME
git add $FILENAME

# echo git commit -m "add $FILENAME to $BRANCHNAME branch"
git commit -m "add $FILENAME to $BRANCHNAME branch"

# echo git push --set-upstream origin $BRANCHNAME
git push --set-upstream origin $BRANCHNAME

# Finishing
# revert to commit
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$BLOCKNAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
