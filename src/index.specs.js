const { expect } = require('chai');
const appIcon = require('..');

describe('index', () => {
  it('should expose the module to be required in another project', () => {
    expect(appIcon.labelImage).to.be.a('function');
    expect(appIcon.generate).to.be.a('function');
    expect(appIcon.templates).to.be.an('object')
      .and.to.have.all.keys(['AndroidManifest.icons', 'AppIcon.iconset']);
  });
});
