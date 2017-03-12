const expect = require('chai').expect;
const labelImage = require('./label-image');
const compareImages = require('../testing/compare-images');

describe('labelImage', () => {
  it('should be able to add a label to the top of an image', () => {
    const input = './src/label/test-images/input.png';
    const output = './src/label/test-images/label-top-output.png';
    const reference = './src/label/test-images/label-top-reference.png';
    return labelImage(input, output, 'UAT', null)
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(2.5, 'Generated image is below accepted similarly threshold');
      });
  });

  it('should be able to add a label to the bottom of an image', () => {
    const input = './src/label/test-images/input.png';
    const output = './src/label/test-images/label-bottom-output.png';
    const reference = './src/label/test-images/label-bottom-reference.png';
    return labelImage(input, output, null, '1.2.3')
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(2.5, 'Generated image is below accepted similarly threshold');
      });
  });
});
