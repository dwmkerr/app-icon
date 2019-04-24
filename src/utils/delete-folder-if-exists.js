const rimraf = require('rimraf');

//  Helper to delete a folder if it exists.
const deleteFolderIfExists = folder => new Promise((resolve, reject) => {
  rimraf(folder, {}, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

module.exports = deleteFolderIfExists;
