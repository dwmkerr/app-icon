const imagemagickCli = require('imagemagick-cli');

//  Takes a source image, resizes to a target path.
module.exports = async function resizeImage(source, target, size) {
  return imagemagickCli.exec(`convert "${source}" -resize ${size} -strip "${target}"`);
};
