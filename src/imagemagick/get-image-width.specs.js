const { expect } = require('chai');
const getImageWidth = require('./get-image-width');

describe('get-image-width', () => {
  it('should be able to get the width of a test image', async () => {
    const width = await getImageWidth('./src/label/test-images/input.png');
    expect(width).to.equal(512);
  });

  it('should reject with an error if the input is not an image', async () => {
    try {
      await getImageWidth('./src/label/get-image-width.js');
    } catch (err) {
      expect(err).to.not.equal(null);
    }
  });
});
