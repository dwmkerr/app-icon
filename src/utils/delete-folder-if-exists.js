const rimraf = require('rimraf');
const { promisify } = require('util');

const rimrafAsync = promisify(rimraf);

//  Helper to delete a folder if it exists.
async function deleteFolderIfExists(folder) {
  return rimrafAsync(folder, {});
}

module.exports = deleteFolderIfExists;
