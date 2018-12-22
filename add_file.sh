# Adds a new file to repo

# Consts
BLOCKS_FOLDER_PATH="blocks/"
BLOCKNAME="$1"
CURRENTDIR=$(pwd)

# solving problem with different func names (md5 / md5sum)
if [[ "$OSTYPE" == "darwin"* ]]; then
  BRANCHNAME=$(cat "${@:2}" | md5 | awk '{print $1}')
else
  BRANCHNAME=$(cat "${@:2}" | md5sum | awk '{print $1}')
fi


mkdir -p $BLOCKS_FOLDER_PATH
cd $BLOCKS_FOLDER_PATH

git clone -b master --depth 1 https://ohld:$GITHUB_TOKEN@github.com/morejust/$BLOCKNAME.git

cd $BLOCKNAME

git config --local user.name "Mr. Store"
git config --local user.email "store@morejust.store"

git checkout -b $BRANCHNAME

for i in "${@:2}"
do
  FILEPATH="$i"
  FILENAME=$(basename "$FILEPATH")

  mv "$FILEPATH" "./$FILENAME"
  git add "$FILENAME"
done

git commit -m "add $@ to $BRANCHNAME branch"
git push --set-upstream origin $BRANCHNAME

# log file links
for i in "${@:2}"
do
  FILENAME=$(basename "$i")
  FILELINK="https://raw.githubusercontent.com/morejust/$BLOCKNAME/$BRANCHNAME/$FILENAME"
  echo "$FILELINK"
done

# Finishing
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR
