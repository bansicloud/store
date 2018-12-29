#!/bin/bash
# Adds a new file to repo

# Params
BLOCKNAME="$1"
FILEPATH="$2"

# Consts
BLOCKS_FOLDER_PATH="blocks/"
CURRENTDIR=$(pwd)
if [ -z ${GITHUB_ORGANIZATION+x} ]; then 
  GITHUB_ACCOUNT=$GITHUB_USERNAME;
  echo "WORKING WITH USER ACC";
else 
  GITHUB_ACCOUNT=$GITHUB_ORGANIZATION;
  echo "WORKING WITH ORGANIZATION ACC";
fi



####### PREPARATIONS #######
if [ ! -f $FILEPATH ]; then
  # TODO: if FILEPATH - is not absolute, condition will pass
  echo "ERROR: File $FILEPATH not found!" && exit 1
fi

# solving problem with different func names (md5 / md5sum)
if [[ "$OSTYPE" == "darwin"* ]]; then
  BRANCHNAME=$((cat "$FILEPATH"; date +%s) | md5 | awk '{print $1}')
else
  BRANCHNAME=$((cat "$FILEPATH"; date +%s) | md5sum | awk '{print $1}')
fi

mkdir -p $BLOCKS_FOLDER_PATH
cd $BLOCKS_FOLDER_PATH

git clone -b master --depth 1 https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_ACCOUNT/$BLOCKNAME.git

cd $BLOCKNAME

####### GIT STUFF #######
git config --local user.name "morejust.store"
git config --local user.email "store@morejust.store"

git checkout -b $BRANCHNAME

FILENAME=$(basename "$FILEPATH")
mv "$FILEPATH" "./$FILENAME"
git add "$FILENAME"

git commit -m "add $FILENAME to $BRANCHNAME branch"
if git push --set-upstream origin $BRANCHNAME
then
  # log file link
  FILELINK="https://raw.githubusercontent.com/$GITHUB_ACCOUNT/$BLOCKNAME/$BRANCHNAME/$FILENAME"
  echo "$FILELINK"
else 
  mv "./$FILENAME" "$FILEPATH"
  echo "ERROR: Upload failed."
fi

# Finishing
git checkout master
git branch -D $BRANCHNAME
cd $CURRENTDIR
