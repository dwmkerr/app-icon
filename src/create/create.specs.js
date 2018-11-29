const { expect } = require('chai');
const create = require('./create');
const compareImages = require('../testing/compare-images');

describe('create', () => {
  it('should be able to create an icon', () => {
    const template = './src/create/icon.template.png';
    const output = './src/create/test-images/create-output.png';
    const reference = './src/create/test-images/create-reference.png';
    return create(template, output)
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(2.5, 'Generated image is below accepted similarly threshold');
      });
  });

  it('should be able to create an icon with a caption', () => {
    const template = './src/create/icon.template.png';
    const output = './src/create/test-images/create-with-caption-output.png';
    const reference = './src/create/test-images/create-with-caption-reference.png';
    return create(template, output, { caption: 'Test' })
      .then(() => compareImages(output, reference))
      .then((difference) => {
        expect(difference).to.be.below(2.5, 'Generated image is below accepted similarly threshold');
      });
  });
});
