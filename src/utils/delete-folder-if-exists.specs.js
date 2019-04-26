const { expect } = require('chai');
const assert = require('assert');
const fs = require('fs');
const deleteFolderIfExists = require('./delete-folder-if-exists');

describe('delete-folder-if-exists', () => {
  it('should be able to delete an existing folder', async () => {
    const testFolder = './temp-folder';
    if (!fs.existsSync(testFolder)) fs.mkdirSync(testFolder);
    await deleteFolderIfExists(testFolder);
    expect(fs.existsSync(testFolder)).to.equal(false);
  });

  it('should handle errors as rejections', async () => {
    try {
      await deleteFolderIfExists(undefined);
      assert.fail('deletion should fail - missing path');
    } catch (err) {
      expect(err.message).to.match(/missing path/);
    }
  });
});
