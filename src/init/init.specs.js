const { expect } = require('chai');
const init = require('./init');
const compareImages = require('../testing/compare-images');

describe('init', () => {
  it('should be able to init an icon', async () => {
    const template = './src/init/icon.template.png';
    const output = './src/init/test-images/init-output.png';
    const reference = './src/init/test-images/init-reference.png';
    await init(template, output);
    const difference = await compareImages(output, reference);
    expect(difference).to.be.below(5, 'Generated image is below accepted similarly threshold');
  });

  it('should be able to init an icon with a caption', async () => {
    const template = './src/init/icon.template.png';
    const output = './src/init/test-images/init-with-caption-output.png';
    const reference = './src/init/test-images/init-with-caption-reference.png';
    await init(template, output, { caption: 'Test' });
    const difference = await compareImages(output, reference);
    expect(difference).to.be.below(5, 'Generated image is below accepted similarly threshold');
  });
});
