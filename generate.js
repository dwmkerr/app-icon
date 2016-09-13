const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const find = require('./find');

const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');

function findIconSets() {
  return find('./', (file, stat) => {
    //  Exclude node modules from the search.
    if(file.match(/node_modules/)) return false;

    //  Only grab the iconset folders.
    return file.match(/AppIcon.appiconset/) && stat.isDirectory();
  });
}

//  Generate an icon.
function generateIcon(source, target, size) {
  return new Promise((resolve, reject) => {
    const command = `convert ${source} -resize ${size} ${target}`;
    console.log("Preparing to execute: " + command);
    child_process.exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log("child processes failed with error code: " +
          err.code);
        return reject(err);
      }
      console.log(stdout);
      return resolve();
    });
  });
}

//  Generate xCode icons given an iconset folder.
function generateIconSetIcons(iconSet) {
  console.log(`Generating icons for iconset ${iconSet}...`);

  //  We've got the iconset folder. Get the contents Json.
  const contentsPath = path.join(iconSet, 'Contents.json');
  var contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(contentsTemplate.images.map(image => {
    const targetName = `icon-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconSet, targetName);
    console.log(`Generating ${targetName} from icon.png...`);
    return generateIcon("icon.png", targetPath, image.size)
      .then(() => {
        contents.images.push({
          size: image.size,
          idiom: image.idiom,
          scale: image.scale,
          filename: targetName
        });
        fs.writeFileSync(contentsPath, JSON.stringify(contents, null, 2), 'utf8');
      });
  }));
}


function generate() {
  return findIconSets()
    .then(iconSets => {
      return Promise.all(iconSets.map(generateIconSetIcons));
    });
}

module.exports = {
  findIconSets,
  generateIconSetIcons,
  generate
};
