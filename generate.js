const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const find = require('./find');
const mkdirp = require('mkdirp');

const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');
const androidManifestIcons = require('./AndroidManifest.icons.json');

function findIconSets(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if(file.match(/node_modules/)) return false;

    //  only grab the iconset folders.
    return file.match(/AppIcon.appiconset/) && stat.isDirectory();
  });
}

function findAndroidManifests(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  Exclude: node modules and android build intermediates.
    if(file.match(/node_modules/)) return false;
    if(file.match(/\/build\//)) return false;

    //  Only grab the manifest file...
    return file.match(/AndroidManifest.xml/) && !stat.isDirectory();
  });
}

//  Generate an icon.
function generateIcon(source, target, size) {
  return new Promise((resolve, reject) => {
    const command = `convert ${source} -resize ${size} ${target}`;
    child_process.exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log("child processes failed with error code: " +
          err.code);
        return reject(err);
      }
      return resolve();
    });
  });
}

//  Generate xCode icons given an iconset folder.
function generateIconSetIcons(iconSet) {
  console.log(`Found iOS iconset: ${iconSet}...`);

  //  We've got the iconset folder. Get the contents Json.
  const contentsPath = path.join(iconSet, 'Contents.json');
  var contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(contentsTemplate.images.map(image => {
    const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconSet, targetName);
    return generateIcon("icon.png", targetPath, image.size)
      .then(() => {
        console.log(`    ${chalk.green('✓')}  Generated ${targetName}`);
        contents.images.push({
          size: image.size,
          idiom: image.idiom,
          scale: image.scale,
          filename: targetName
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
  return Promise.all(androidManifestIcons.icons.map(icon  => {
    const targetPath = path.join(manifestFolder, icon.path);

    //  Each icon lives in its own folder, so we'd better make sure that folder
    //  exists.
    return new Promise((resolve, reject) => {
      mkdirp(path.dirname(targetPath), (err) => {
        if(err) return reject(err);

        return resolve(generateIcon("icon.png", targetPath, icon.size)
          .then(() => {
            console.log(`    ${chalk.green('✓')}  Generated ${icon.path}`);
          }));
      });
    });
  }));
}

function generate(searchRoot) {
  return findIconSets(searchRoot)
    .then(iconSets => Promise.all(iconSets.map(generateIconSetIcons)))
    .then(() => findAndroidManifests(searchRoot))
    .then((manifests) => Promise.all(manifests.map(generateManifestIcons)));
}

module.exports = {
  findIconSets,
  findAndroidManifests,
  generateManifestIcons,
  generateIconSetIcons,
  generate
};
