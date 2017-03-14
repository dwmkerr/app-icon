const callImagemagick = require('../imagemagick/call-imagemagick');

module.exports = function getImageWidth(path) {
  return callImagemagick(`identify -format %w "${path}"`)
    .then(({ stdout }) => {
      //  Attempt to turn the width into pixels.
      const pixelWidth = parseInt(stdout, 10);
      if (isNaN(pixelWidth)) {
        console.log(`returned width '${stdout}' cannot be parsed into a number`);
        return Promise.reject(new Error(`Cannot parse returned width '${stdout}'`));
      }

      return Promise.resolve(pixelWidth);
    });
};
