#!/bin/bash -v

git add ./out
git commit -m "[skip ci] Release"
git tag $VERSION_TAG
npm publish
