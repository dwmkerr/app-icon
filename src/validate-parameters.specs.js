const assert = require('assert');
const validateParameters = require('./validate-parameters');

describe('validateParameters', () => {
  function validParameters() {
    return {
      sourceIcon: 'icon.png',
      searchRoot: './',
      platforms: 'android,ios',
    };
  }

  it('should provide a default source icon', () => {
    const params = validParameters();
    delete params.sourceIcon;
    const parameters = validateParameters(params);
    assert.equal(parameters.sourceIcon, 'icon.png');
  });

  it('should provide a default search root', () => {
    const params = validParameters();
    delete params.searchRoot;
    const parameters = validateParameters(params);
    assert.equal(parameters.searchRoot, './');
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
