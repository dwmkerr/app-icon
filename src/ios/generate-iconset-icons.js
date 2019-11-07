const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const resizeImage = require('../resize/resize-image');
const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');

//  Generate xCode icons given an iconset folder.
module.exports = async function generateIconSetIcons(sourceIcon, iconset) {
  //  Build the results object.
  const results = {
    icons: [],
    contentsPath: null,
  };

  //  We've got the iconset folder. Get the contents Json.
  const contentsPath = path.join(iconset, 'Contents.json');
  const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  await Promise.all(contentsTemplate.images.map(async (image) => {
    const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconset, targetName);
    const targetScale = parseInt(image.scale.slice(0, 1), 10);
    const targetSize = image.size.split('x').map((p) => p * targetScale).join('x');
    await resizeImage(sourceIcon, targetPath, targetSize);
    results.icons.push(targetName);
    contents.images.push({
      size: image.size,
      idiom: image.idiom,
      scale: image.scale,
      filename: targetName,
    });
  }));

  contents.images.sort((imageA, imageB) => imageA.filename.localeCompare(imageB.filename));
  await writeFileAsync(contentsPath, JSON.stringify(contents, null, 2));
  results.contentsPath = contentsPath;

  return results;
};
