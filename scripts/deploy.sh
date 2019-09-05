#!/bin/bash -v

git add ./out
git commit -m "[skip travis] Release"
git tag $VERSION_TAG
git push -f --tags https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git HEAD:master
npm publish
curl -X POST http://120.25.224.35:8081/version -d '{"name": "${PKG_NAME}","version": "${VERSION_TAG}"}'
