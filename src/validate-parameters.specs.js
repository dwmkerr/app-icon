const assert = require('assert');
const validateParameters = require('./validate-parameters');

describe('validateParameters', () => {
  function validParameters() {
    return {
      sourceIcon: 'icon.png',
      backgroundIcon: 'icon.background.png',
      foregroundIcon: 'icon.foreground.png',
      searchRoot: './',
      platforms: 'android,ios',
      adaptiveIcons: false,
    };
  }

  it('should provide a default source icon', () => {
    const params = validParameters();
    delete params.sourceIcon;
    const parameters = validateParameters(params);
    assert.equal(parameters.sourceIcon, 'icon.png');
  });

  it('should provide a default background icon', () => {
    const params = validParameters();
    delete params.backgroundIcon;
    const parameters = validateParameters(params);
    assert.equal(parameters.backgroundIcon, 'icon.background.png');
  });

  it('should provide a default foreground icon', () => {
    const params = validParameters();
    delete params.foregroundIcon;
    const parameters = validateParameters(params);
    assert.equal(parameters.foregroundIcon, 'icon.foreground.png');
  });

  it('should provide a default search root', () => {
    const params = validParameters();
    delete params.searchRoot;
    const parameters = validateParameters(params);
    assert.equal(parameters.searchRoot, './');
  });

  it('should provide a default adaptive icons option', () => {
    const params = validParameters();
    delete params.adaptiveIcons;
    const parameters = validateParameters(params);
    assert.equal(parameters.adaptiveIcons, false);
  });

  it('should provide a default set of platforms', () => {
    const params = validParameters();
    delete params.platforms;
    const parameters = validateParameters(params);
    assert.deepEqual(parameters.platforms, ['android', 'ios']);
  });

  it('should reject invalid platforms', () => {
    const params = validParameters();
    params.platforms = 'android,jos';
    assert.throws(() => validateParameters(params), /jos.*not a valid platform/);
  });
});
