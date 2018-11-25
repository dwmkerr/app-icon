const imagemagickCli = require('imagemagick-cli');

//  Takes a source image, resizes to a target path.
module.exports = function resizeImage(source, target, size) {
  return imagemagickCli.exec(`convert "${source}" -resize ${size} "${target}"`);
};
