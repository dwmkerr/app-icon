const fs = require('fs');

/**
 * copyFile - copy 'source' to 'destination'. Needed as Node 6 doesn't have a
 * native method. Once we move to Node 8 as the standard, we can retire this
 * function.
 *
 * @param source - the path to the source file.
 * @param target - the path to the target file.
 * @returns - a promise which resolves when the file is copied, or rejects on an error.
 */
function copyFile(source, target) {
  const rd = fs.createReadStream(source);
  const wr = fs.createWriteStream(target);
  return new Promise((resolve, reject) => {
    rd.on('error', reject);
    wr.on('error', reject);
    wr.on('finish', resolve);
    rd.pipe(wr);
  }).catch((error) => {
    rd.destroy();
    wr.end();
    throw error;
  });
}

module.exports = copyFile;
