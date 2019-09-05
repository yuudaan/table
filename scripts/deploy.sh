#!/bin/bash -v

git add ./out
git commit -m "[skip travis] Release"
git tag $VERSION_TAG
git push -f --tags https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git HEAD:master
npm publish
node ./scripts/release.js