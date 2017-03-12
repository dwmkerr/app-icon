const childProcess = require('child_process');

//  Compare two images, returning the percentage of differing pixels.
module.exports = function compareImages(lhs, rhs) {
  return new Promise((resolve, reject) => {
    const compareCommand = `compare -metric ae "${lhs}" "${rhs}" null:`;
    childProcess.exec(compareCommand, (err, _, stderr) => {
      //  Remember: imagemagick is odd here. Error code 1 means the images are
      //  different, not that the program failed. Also, stderr is used for
      //  output, even on success.
      if (err && err.code !== 1) {
        console.log(`child processes failed with error code: ${err.code}`);
        return reject(err);
      }

      const differingPixels = parseInt(stderr, 10);
      if (isNaN(differingPixels)) {
        console.log(`returned differing pixels '${stderr}' cannot be parsed into a number`);
        return reject(new Error(`Cannot parse returned differing pixels '${stderr}'`));
      }

      //  Now get the differing pixels as a percentage.
      const identifyCommand = `identify -format "%[fx:${differingPixels}*100/(w*h)]" "${lhs}"`;
      return childProcess.exec(identifyCommand, (identifyErr, percentage) => {
        if (identifyErr) {
          console.log(`child processes failed with error code: ${identifyErr.code}`);
          return reject(identifyErr);
        }

        const percentageDifference = parseInt(percentage, 10);
        if (isNaN(percentageDifference)) {
          console.log(`returned percentage '${percentage}' cannot be parsed into a number`);
          return reject(new Error(`Cannot parse returned percentage '${percentage}'`));
        }

        return resolve(percentage);
      });
    });
  });
};
