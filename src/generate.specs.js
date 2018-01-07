const { expect } = require('chai');
const generate = require('./generate');

describe('generate', () => {
  it('should be able to generate test app icons', () => {
    const parameters = {
      sourceIcon: 'icon.png',
      searchPath: './',
    };

    //  Delete all of the files we're expecting to create, then generate them.
    return generate(parameters).then((results) => {
      //  TODO: Check we found the manifests etc etc
      expect(results).not.to.equal(null);
      expect(results.iconsets.length).to.equal(3);
      expect(results.manifests.length).to.equal(4);
    });
  });
});
