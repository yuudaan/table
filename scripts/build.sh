#!/bin/bash -v

echo "//npm.huanleguang.com/:_authToken=${NPM_TOKEN}" >> .npmrc
echo "//registry.npmjs.org/:_authToken=${PUBLISH_TOKEN}" >> .npmrc
npm config set @gaoding:registry https://npm.huanleguang.com
git config --global user.name "yudan"
git config --global user.email "yudan@gaoding.com"
export VERSION_TAG=`node -p "require('./package.json').version"`
export PKG_NAME=`node -p "require('./package.json').name"`

npm install
npm run build
node ./script/release.js

