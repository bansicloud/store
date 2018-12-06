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

# solving problem with different func names (md5 / md5sum)
if [[ "$OSTYPE" == "darwin"* ]]; then
  BRANCHNAME=$(echo -n $FILEPATH| md5 | awk '{print $1}')
else
  BRANCHNAME=$(echo -n $FILEPATH| md5sum | awk '{print $1}')
fi

mkdir -p $BLOCKS_FOLDER_PATH
cd $BLOCKS_FOLDER_PATH

git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git 

cd $BLOCKNAME
git checkout -b $BRANCHNAME

mv $FILEPATH ./
git add $FILENAME
git commit -m "add $FILENAME to $BRANCHNAME branch"
git push --set-upstream origin $BRANCHNAME

# Finishing
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR

FILELINK="https://raw.githubusercontent.com/morejust/$BLOCKNAME/$BRANCHNAME/$FILENAME"
echo $FILELINK
