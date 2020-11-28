const { expect } = require('chai');
const generate = require('./generate');

describe('generate', () => {
  it('should be able to generate test app icons', async () => {
    const parameters = {
      sourceIcon: './test/icon.png',
      searchPath: './',
    };

    //  Delete all of the files we're expecting to create, then generate them.
    const results = await generate(parameters);
    //  TODO: Check we found the manifests etc etc
    expect(results).to.not.equal(null);
    expect(results.iconsets.length).to.equal(3);
    expect(results.manifests.length).to.equal(3);
  });

  it('should be able to generate test app icons with adaptive icons included', async () => {
    const parameters = {
      sourceIcon: './test/icon.png',
      backgroundIcon: './test/icon.background.png',
      foregroundIcon: './test/icon.foreground.png',
      searchPath: './',
      adaptiveIcons: true,
    };

    //  Delete all of the files we're expecting to create, then generate them.
    const results = await generate(parameters);
    //  TODO: Check we found the manifests etc etc
    expect(results).to.not.equal(null);
    expect(results.iconsets.length).to.equal(3);
    expect(results.manifests.length).to.equal(3);
    expect(results.adaptiveIconManifests.length).to.equal(3);
  });
});
