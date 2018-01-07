const { expect } = require('chai');
const getImageWidth = require('./get-image-width');

describe('get-image-width', () => {
  it('should be able to get the width of a test image', () => {
    return getImageWidth('./src/label/test-images/input.png').then((width) => {
      expect(width).to.equal(512);
    });
  });

  it('should reject with an error if the input is not an image', () => {
    return getImageWidth('./src/label/get-image-width.js').catch((err) => {
      expect(err).to.not.equal(null);
    });
  });
});
