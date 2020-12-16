const imagemagickCli = require('imagemagick-cli');

module.exports = async function monochromeImage(source, target, color = 'black') {
  return imagemagickCli.exec(`convert "${source}" -fill ${color} -colorize 100 "${target}"`);
};
