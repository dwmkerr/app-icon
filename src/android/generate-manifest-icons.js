const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const androidManifestIcons = require('./AndroidManifest.icons.json');
const resizeImage = require('../resize/resize-image');

//  Generate Android Manifest icons given a manifest file.
function generateManifestIcons(manifest) {
  console.log(`Found Android Manifest: ${manifest}...`);

  //  We've got the manifest file, get the parent folder.
  const manifestFolder = path.dirname(manifest);

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(androidManifestIcons.icons.map((icon) => {
    const targetPath = path.join(manifestFolder, icon.path);

    //  Each icon lives in its own folder, so we'd better make sure that folder
    //  exists.
    return new Promise((resolve, reject) => {
      mkdirp(path.dirname(targetPath), (err) => {
        if (err) return reject(err);

        return resolve(resizeImage('icon.png', targetPath, icon.size)
          .then(() => {
            console.log(`    ${chalk.green('✓')}  Generated ${icon.path}`);
          }));
      });
    });
  }));
}

module.exports = generateManifestIcons;
