const imagemagickCli = require('imagemagick-cli');

module.exports = async function getImageWidth(path) {
  const { stdout } = await imagemagickCli.exec(`identify -format %w "${path}"`);
  //  Attempt to turn the width into pixels.
  const pixelWidth = parseInt(stdout, 10);
  if (Number.isNaN(pixelWidth)) {
    console.log(`returned width '${stdout}' cannot be parsed into a number`);
    throw new Error(`Cannot parse returned width '${stdout}'`);
  }

  return pixelWidth;
};
