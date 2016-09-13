const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const find = require('./find');

const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');

function findIconSets() {
  return find('./', (file, stat) => {
    //  exclude node modules from the search.
    if(file.match(/node_modules/)) return false;

    //  only grab the iconset folders.
    return file.match(/appicon.appiconset/) && stat.isDirectory();
  });
}

function findAndroidManifests() {
  return find('./', (file, stat) => {
    //  exclude node modules from the search.
    if(file.match(/node_modules/)) return false;

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
    const targetName = `icon-${image.size}-${image.scale}.png`;
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

function generate() {
  return findIconSets()
    .then(iconSets => {
      return Promise.all(iconSets.map(generateIconSetIcons));
    });
}

module.exports = {
  findIconSets,
  findAndroidManifests,
  generateIconSetIcons,
  generate
};
