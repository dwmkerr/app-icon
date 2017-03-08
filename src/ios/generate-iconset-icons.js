const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const resizeImage = require('../resize/resize-image');
const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');

//  TODO: explicitly promisify this function to avoid sync calls.
//  Generate xCode icons given an iconset folder.
function generateIconSetIcons(iconset) {
  //  TODO: If we resolve the targetPaths from this function, we can extract
  //  the console statements out of it to the caller...
  console.log(`Found iOS iconset: ${iconset}...`);

  //  We've got the iconset folder. Get the contents Json.
  const contentsPath = path.join(iconset, 'Contents.json');
  const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(contentsTemplate.images.map((image) => {
    const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconset, targetName);
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

module.exports = generateIconSetIcons;
