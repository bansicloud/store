# Adds a new file to repo

git config --global user.email "you@example.com"
git config --global user.name "Your Name"

# First argument - repo path
BLOCKS_FOLDER_PATH=$1
BLOCKNAME="b1"

# Second argument - file-to-add path
FILEPATH=$2
FILENAME=$(basename $FILEPATH)

echo "BLOCK FOLDER PATH "$BLOCKS_FOLDER_PATH
echo "FILEPATH "$FILEPATH
echo "FILENAME "$FILENAME

# Maybe this should be replaced for non macOS systems:
# md5 -> md5sum
# HASHEDFILEPATH=$(echo -n $FILEPATH| md5sum | awk '{print $1}')

# For debugging: TODO: revert to md5 hash
BRANCHNAME=$FILENAME

CURRENTDIR=$(pwd)

cd $BLOCKS_FOLDER_PATH

# trying to clone repo

# if [ ! -d "$BLOCKNAME" ]; then
#   echo git clone https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git
#   git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git
# fi

git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git

cd $BLOCKNAME

# Checkout to the very first repo commit
git checkout `git rev-list --max-parents=0 HEAD | tail -n 1`

git add .
git reset --hard origin/master
git checkout -b $BRANCHNAME

mv $FILEPATH ./

# echo git status
# git status


echo git add $FILENAME
git add $FILENAME

echo git commit -m "add $FILENAME to $BRANCHNAME branch"
git commit -m "add $FILENAME to $BRANCHNAME branch"

# check if succeeded

echo git push --set-upstream origin $BRANCHNAME
git push --set-upstream origin $BRANCHNAME

# Finishing
# revert to commit
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$BLOCKNAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
