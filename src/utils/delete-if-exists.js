const fs = require('fs');

//  Unlinks a file or folder. Resolves with true if a deletion occured, false
//  if no deletion occured, and rejets if there is an exception.
module.exports = function deleteIfExists(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
};
