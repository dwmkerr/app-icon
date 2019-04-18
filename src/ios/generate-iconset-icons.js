const path = require('path');
const fs = require('fs');

const resizeImage = require('../resize/resize-image');
const contentsTemplate = require('./AppIcon.iconset.Contents.template.json');

//  Generate xCode icons given an iconset folder.
module.exports = function generateIconSetIcons(sourceIcon, iconset) {
  return new Promise((resolve, reject) => {
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
    return Promise.all(contentsTemplate.images.map((image) => {
      const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
      const targetPath = path.join(iconset, targetName);
      const targetScale = parseInt(image.scale.slice(0, 1), 10);
      const targetSize = image.size.split('x').map(p => p * targetScale).join('x');
      return resizeImage(sourceIcon, targetPath, targetSize)
        .then(() => {
          results.icons.push(targetName);
          contents.images.push({
            size: image.size,
            idiom: image.idiom,
            scale: image.scale,
            filename: targetName,
          });
        });
    }))
      .then(() => {
        //  Before writing the contents file, sort the contents (otherwise
        //  they could be in a different order each time).
        contents.images.sort((imageA, imageB) => imageA.filename.localeCompare(imageB.filename));
        fs.writeFile(contentsPath, JSON.stringify(contents, null, 2), (err) => {
          if (err) return reject(err);
          results.contentsPath = contentsPath;
          return resolve(results);
        });
      });
  });
};
