const fs = require('fs');

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
}

module.exports = fileExists;
