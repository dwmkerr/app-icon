const { expect } = require('chai');
const callImagemagick = require('./call-imagemagick');

describe('call-imagemagick', () => {
  it('should be able to call imagemagick and get the installed version', () => {
    return callImagemagick('identify -version')
      .then(({ stdout }) => {
        expect(stdout).to.match(/Version: ImageMagick/);
      });
  });

  it('should return a sensible error if the command has bad parameters', () => {
    return callImagemagick('identify no-file.png')
      .catch(({ err }) => {
        expect(err.message).to.match(/unable to open image/);
      });
  });

  it('should return a sensible error if the command does not exist', () => {
    return callImagemagick('there-is-no-way-this-is-an-installed-command')
      .catch(({ err }) => {
        expect(err.message).to.match(/not found/);
      });
  });
});
