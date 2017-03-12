const childProcess = require('child_process');

module.exports = function getImageWidth(path) {
  return new Promise((resolve, reject) => {
    const command = `identify -format %w "${path}"`;
    childProcess.exec(command, (err, stdout) => {
      if (err) {
        console.log(`child processes failed with error code: ${err.code}`);
        return reject(err);
      }

      //  Attempt to turn the width into pixels.
      const pixelWidth = parseInt(stdout, 10);
      if (isNaN(pixelWidth)) {
        console.log(`returned width '${stdout}' cannot be parsed into a number`);
        return reject(new Error(`Cannot parse returned width '${stdout}'`));
      }

      return resolve(pixelWidth);
    });
  });
};
