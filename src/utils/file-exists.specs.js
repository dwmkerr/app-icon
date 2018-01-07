const { expect } = require('chai');
const fileExists = require('./file-exists');

describe('file-exists', () => {
  it('should be able to check an existing file', () => {
    return fileExists('./src/utils/file-exists.js')
      .then((exists) => {
        expect(exists).to.equal(true);
      });
  });

  it('should be able to check a non-existant file', () => {
    return fileExists('./src/utils/file-does-not-exist.js')
      .then((exists) => {
        expect(exists).to.equal(false);
      });
  });

  it('should be return a sensible error message with invalid input', () => {
    return fileExists(undefined)
      .catch((err) => {
        expect(err.message).to.match(/path must be a string/);
      });
  });
});
