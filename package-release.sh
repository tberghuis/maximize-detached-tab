#!/bin/bash

# before run check
# manifest version
# diff manifest prod dev
# background.js comment out listenReloadCommand

rm -rf release
rm release.zip

mkdir release
mkdir release/images
cp images/*.png release/images/

cp background.js release/
cp manifest.prod.json release/manifest.json
cp popup.* release/

# zip
cd release
zip -r ../release.zip ./
cd ..
