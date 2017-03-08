const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const findIconsetFolders = require('./ios/find-iconset-folders');
const findAndroidManifests = require('./android/find-android-manifests');
const resizeImage = require('./resize/resize-image');
const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');
const androidManifestIcons = require('./AndroidManifest.icons.json');

//  Generate xCode icons given an iconset folder.
function generateIconSetIcons(iconSet) {
  console.log(`Found iOS iconset: ${iconSet}...`);

  //  We've got the iconset folder. Get the contents Json.
  const contentsPath = path.join(iconSet, 'Contents.json');
  const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(contentsTemplate.images.map((image) => {
    const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconSet, targetName);
    const targetScale = parseInt(image.scale.slice(0, 1), 10);
    const targetSize = image.size.split('x').map(p => p * targetScale).join('x');
    return resizeImage('icon.png', targetPath, targetSize)
      .then(() => {
        console.log(`    ${chalk.green('✓')}  Generated ${targetName}`);
        contents.images.push({
          size: image.size,
          idiom: image.idiom,
          scale: image.scale,
          filename: targetName,
        });
      });
  }))
  .then(() => {
    fs.writeFileSync(contentsPath, JSON.stringify(contents, null, 2), 'utf8');
    console.log(`    ${chalk.green('✓')}  Updated Contents.json`);
  });
}

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

function generate(searchRoot) {
  return findIconsetFolders(searchRoot)
    .then(iconSets => Promise.all(iconSets.map(generateIconSetIcons)))
    .then(() => findAndroidManifests(searchRoot))
    .then(manifests => Promise.all(manifests.map(generateManifestIcons)));
}

module.exports = {
  findIconsetFolders,
  findAndroidManifests,
  generateManifestIcons,
  generateIconSetIcons,
  generate,
};
