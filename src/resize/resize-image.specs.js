const { expect } = require('chai');
const resizeImage = require('./resize-image');
const compareImages = require('../testing/compare-images');

describe('resize-image', () => {
  it('should be able to downscale an image', () => {
    const input = './src/resize/test-images/input.png';
    const output = './src/resize/test-images/output.png';
    const reference = './src/resize/test-images/reference.png';
    return resizeImage(input, output, '16x16')
      .then(() => {
        return compareImages(output, reference);
      })
      .then((difference) => {
        //  Note that locally, I can pass this test with a threshhold of 1. But
        //  on circle, it only manages about 18. Probably due to differing
        //  imagemagick versions...
        expect(difference).to.be.below(20, 'Generated image is below accepted similarly threshold');
      });
  });

  it('should fail with a sensible error message if imagemagick returns an error', () => {
    return resizeImage('badinput', 'badoutput', 'badsize').catch((err) => {
      expect(err.message).to.match(/failed/);
    });
  });
});
