const findIconsetFolders = require('./ios/find-iconset-folders');
const generateIconsetIcons = require('./ios/generate-iconset-icons');
const findAndroidManifests = require('./android/find-android-manifests');
const generateManifestIcons = require('./android/generate-manifest-icons');

function generate(searchRoot) {
  return findIconsetFolders(searchRoot)
    .then(iconSets => Promise.all(iconSets.map(generateIconsetIcons)))
    .then(() => findAndroidManifests(searchRoot))
    .then(manifests => Promise.all(manifests.map(generateManifestIcons)));
}

module.exports = {
  generate,
};
