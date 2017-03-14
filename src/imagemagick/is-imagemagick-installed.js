const commandExists = require('command-exists');

//  Returns a promise which resolves with true if imagemagick is installed and
//  false otherwise.
module.exports = function isImagemagickInstalled() {
  return new Promise((resolve, reject) => {
    //  Imagemagick installs a suite of commands, we'll check against the common
    //  'convert' command to see if it is installed.
    commandExists('convert', (err, imageMagickInstalled) => {
      if (err) return reject(err);
      return resolve(imageMagickInstalled);
    });
  });
};
