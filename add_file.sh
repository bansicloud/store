# Adds a new file to repo

# Consts
BLOCKS_FOLDER_PATH="blocks/"
BLOCKNAME="b1"
CURRENTDIR=$(pwd)
git config --global user.email "store@morejust.store"
git config --global user.name "Mr. Store"

# solving problem with different func names (md5 / md5sum)
if [[ "$OSTYPE" == "darwin"* ]]; then
  BRANCHNAME=$(echo -n "$@"| md5 | awk '{print $1}')
else
  BRANCHNAME=$(echo -n "$@"| md5sum | awk '{print $1}')
fi


mkdir -p $BLOCKS_FOLDER_PATH
cd $BLOCKS_FOLDER_PATH

git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git 

cd $BLOCKNAME
git checkout -b $BRANCHNAME

for i in "$@"
do
  FILEPATH=$i
  FILENAME=$(basename $FILEPATH)
	
  mv $FILEPATH ./
  git add $FILENAME	
done

git commit -m "add $@ to $BRANCHNAME branch"
git push --set-upstream origin $BRANCHNAME

# log file links
for i in "$@"
do
  FILENAME=$(basename $i)
  FILELINK="https://raw.githubusercontent.com/morejust/$BLOCKNAME/$BRANCHNAME/$FILENAME"
  echo $FILELINK
done

# Finishing
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR
