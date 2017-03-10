const childProcess = require('child_process');

//  Takes a source image, resizes to a target path.
module.exports = function resizeImage(source, target, size) {
  return new Promise((resolve, reject) => {
    const command = `convert ${source} -resize ${size} ${target}`;
    childProcess.exec(command, (err) => {
      if (err) {
        console.log(`child processes failed with error code: ${err.code}`);
        return reject(err);
      }
      return resolve();
    });
  });
};
