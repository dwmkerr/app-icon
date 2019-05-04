const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

//  Unlinks a file or folder. Resolves with true if a deletion occured, false
//  if no deletion occured, and rejets if there is an exception.
module.exports = async function deleteIfExists(path) {
  try {
    await unlinkAsync(path);
    return true;
  } catch (err) {
    if (err && err.code === 'ENOENT') return false;
    throw err;
  }
};
