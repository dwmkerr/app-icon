const chalk = require('chalk');
const findIconsetFolders = require('./ios/find-iconset-folders');
const generateIconsetIcons = require('./ios/generate-iconset-icons');
const findAndroidManifests = require('./android/find-android-manifests');
const generateManifestIcons = require('./android/generate-manifest-icons');

module.exports = function generate(sourceIcon, searchRoot) {
  return findIconsetFolders(searchRoot)
    .then(iconSets => Promise.all(iconSets.map((iconset) => {
      console.log(`Found iOS iconset: ${iconset}...`);

      return generateIconsetIcons(sourceIcon, iconset)
        .then((results) => {
          results.icons.forEach((icon) => {
            console.log(`    ${chalk.green('✓')}  Generated ${icon}`);
          });
          console.log(`    ${chalk.green('✓')}  Updated Contents.json`);
        });
    })))
    .then(() => findAndroidManifests(searchRoot))
    .then(manifests => Promise.all(manifests.map((manifest) => {
      console.log(`Found Android Manifest: ${manifest}...`);
      return generateManifestIcons(sourceIcon, manifest).then((results) => {
        results.icons.forEach((icon) => {
          console.log(`    ${chalk.green('✓')}  Generated ${icon}`);
        });
      });
    })));
};
