git add ./out
git commit -m "[skip travis] Release"
git tag $VERSION_TAG
git push -f --tags https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git HEAD:master
npm publish
curl https://cdn.jsdelivr.net/gh/${TRAVIS_REPO_SLUG}@$VERSION_TAG/out/index.js > temp.js
curl https://cdn.jsdelivr.net/npm/$PKG_NAME@$VERSION_TAG/out/index.js > temp.js