const { expect } = require('chai');
const monochromeImage = require('./monochrome-image');
const compareImages = require('../testing/compare-images');

describe('monochrome-image', () => {
  it('should be able to monochrome an image to given color', async () => {
    const input = './src/color/test-images/input.png';
    const output = './src/color/test-images/output.png';
    const reference = './src/color/test-images/reference-white.png';
    await monochromeImage(input, output, 'white');
    const difference = await compareImages(output, reference);
    expect(difference).to.be.below(1, 'Generated image is below accepted similarly threshold');
  });

  it('should be able to monochrome an image with default color', async () => {
    const input = './src/color/test-images/input.png';
    const output = './src/color/test-images/output.png';
    const reference = './src/color/test-images/reference-default.png';
    await monochromeImage(input, output);
    const difference = await compareImages(output, reference);
    expect(difference).to.be.below(1, 'Generated image is below accepted similarly threshold');
  });

  it('should fail with a sensible error message if imagemagick returns an error', async () => {
    try {
      await monochromeImage('badinput', 'badoutput', 'badcolor');
    } catch (err) {
      expect(err.message).to.match(/failed/);
    }
  });
});
