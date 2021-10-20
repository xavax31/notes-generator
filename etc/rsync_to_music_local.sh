#!/bin/bash

REMOTE_DIR_NAME=gemmatch

DIR=$(cd "$(dirname "$0")/.."; pwd)
TARGET=$(cd "$(dirname "$0")/../.."; pwd)


SERVER_ROOT="$TARGET/music/public/trainer"
PROJECT_PATH="$DIR/public"


FULLSERVERPATH="$SERVER_ROOT$REMOTE_PATH"
echo $PROJECT_PATH
echo $FULLSERVERPATH

# add --dry-run for dry

      rsync -rip  "$PROJECT_PATH/" "$FULLSERVERPATH" --exclude='.git/' --exclude='doc/'  --exclude='node_modules/'   --exclude '*.fla'  --exclude 'index_dev.html' --exclude 'phaser.js'  --delete 
      echo "PUSH ENDED"
      # echo "main infos like date are saved in <project>/rsync.json"
      # echo "log of changed files (dry run) is keeped in <project>/rsync.log"
      # echo "compare the local and distant files rsync.log allow to know if versions match"

       # sudo chmod 664 $(find <directory> -type f) : change chmod for files only, recursive
       # sudo chown -R root:jx <directory> : change owner:group for directory, recursive

sleep 5