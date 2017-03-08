const expect = require('chai').expect;
const resizeImage = require('./resize-image');

describe('resize-image', () => {
  xit('should be able to downscale an image', () => {
    return resizeImage('./src/resize/test-input-512.png',
      './src/resize/test-output-16.png',
      '16x16').then(() => {
        //  TODO: image compare test-output-16 with test-reference-16.
      });
  });

  xit('should fail with a sensible error message is imagemagick is not installed', () => {
    //  TODO: still some work to do to cover the negative scenarios.
  });

  xit('should fail with a sensible error message if imagemagick returns an error', () => {
    return resizeImage('./src/resize/test-input-512.png',
      './src/resize/test-output-16.png',
      '16!16').catch((err) => {
        //  TODO: still some work to do to cover the negative scenarios.
        expect(err).to.match(/convert/);
      });
  });
});
