const expect = require('chai').expect;
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
        expect(difference).to.be.below(1, 'Generated image is below accepted similarly threshold');
      });
  });

  it('should fail with a sensible error message if imagemagick returns an error', () => {
    return resizeImage('badinput', 'badoutput', 'badsize').catch((err) => {
      expect(err.message).to.match(/failed/);
    });
  });
});
