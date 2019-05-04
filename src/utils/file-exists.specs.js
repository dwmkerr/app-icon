const { expect } = require('chai');
const fileExists = require('./file-exists');

describe('file-exists', () => {
  it('should be able to check an existing file', async () => {
    const exists = await fileExists('./src/utils/file-exists.js');
    expect(exists).to.equal(true);
  });

  it('should be able to check a non-existant file', async () => {
    const exists = await fileExists('./src/utils/file-does-not-exist.js');
    expect(exists).to.equal(false);
  });

  it('should be return a sensible error message with invalid input', async () => {
    try {
      await fileExists(undefined);
    } catch (err) {
      expect(err.message).to.match(/path.*string/);
    }
  });
});
