const callImagemagick = require('../imagemagick/call-imagemagick');

//  Takes a source image, resizes to a target path.
var convert = (process.platform=='win32')?'magick convert':'convert';
module.exports = function resizeImage(source, target, size) {
  return callImagemagick(convert+` "${source}" -resize ${size} "${target}"`);
};
