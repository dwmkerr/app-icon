const { expect } = require('chai');
const fs = require('fs');
const deleteIfExists = require('./delete-if-exists');

describe('delete-if-exists', () => {
  fs.closeSync(fs.openSync('./temp.test', 'w'));
  it('should be able to delete an existing file', async () => {
    const exists = await deleteIfExists('./temp.test');
    expect(exists).to.equal(true);
  });

  it('should be able to not delete a non-existant file', async () => {
    const exists = await deleteIfExists('./does-not-exist.test');
    expect(exists).to.equal(false);
  });

  it('should be return a sensible error message with invalid input', async () => {
    try {
      await deleteIfExists(undefined);
    } catch (err) {
      expect(err.message).to.match(/path.*string/);
    }
  });
});
