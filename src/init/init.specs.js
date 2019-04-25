const { expect } = require('chai');
const init = require('./init');
const compareImages = require('../testing/compare-images');

describe('init', () => {
  it('should be able to init an icon', () => {
    const template = './src/init/icon.template.png';
    const output = './src/init/test-images/init-output.png';
    const reference = './src/init/test-images/init-reference.png';
    return init(template, output)
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(5, 'Generated image is below accepted similarly threshold');
      });
  });

  it('should be able to init an icon with a caption', () => {
    const template = './src/init/icon.template.png';
    const output = './src/init/test-images/init-with-caption-output.png';
    const reference = './src/init/test-images/init-with-caption-reference.png';
    return init(template, output, { caption: 'Test' })
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(5, 'Generated image is below accepted similarly threshold');
      });
  });
});
