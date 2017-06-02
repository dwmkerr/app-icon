const chalk = require('chalk');
const findIconsetFolders = require('./ios/find-iconset-folders');
const generateIconsetIcons = require('./ios/generate-iconset-icons');
const findAndroidManifests = require('./android/find-android-manifests');
const generateManifestIcons = require('./android/generate-manifest-icons');
const validateParameters = require('./validate-parameters');

module.exports = function generate(parameters) {
  //  Validate and coerce the parameters.
  const { sourceIcon, searchRoot, platforms } = validateParameters(parameters);

  //  Set up the results object.
  const results = { iconsets: [], manifests: [] };

  return findIconsetFolders(searchRoot)
    .then(iconSets => Promise.all(iconSets.map((iconset) => {
      if (!platforms.includes('ios')) return null;

      console.log(`Found iOS iconset: ${iconset}...`);

      return generateIconsetIcons(sourceIcon, iconset)
        .then(({ icons }) => {
          results.iconsets.push({ iconset, icons });
          icons.forEach((icon) => {
            console.log(`    ${chalk.green('✓')}  Generated ${icon}`);
          });
          console.log(`    ${chalk.green('✓')}  Updated Contents.json`);
        });
    })))
    .then(() => findAndroidManifests(searchRoot))
    .then(manifests => Promise.all(manifests.map((manifest) => {
      if (!platforms.includes('android')) return null;

      console.log(`Found Android Manifest: ${manifest}...`);
      return generateManifestIcons(sourceIcon, manifest).then(({ icons }) => {
        results.manifests.push({ manifest, icons });
        icons.forEach((icon) => {
          console.log(`    ${chalk.green('✓')}  Generated ${icon}`);
        });
      });
    })))
    .then(() => results);
};
