const fs = require('fs');
const { promisify } = require('util');

const statAsync = promisify(fs.stat);

module.exports = async function fileExists(path) {
  try {
    await statAsync(path);
    return true;
  } catch (err) {
    if (err && err.code === 'ENOENT') return false;
    throw err;
  }
};
