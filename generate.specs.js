/* eslint-env node, mocha */
const expect = require('chai').expect;
const { findIconSets, generate } = require('./generate');

describe('Find Icon Sets', () => {
  it('should be able to find the iOS iconsets', () => {
    return findIconSets('./').then(iconSets => {
      expect(iconSets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should not find any iconsets in the node_modules/ folder', () => {
    return findIconSets('./').then(iconSets => {
      iconSets.forEach(is => expect(is).not.to.match(/node_modules/));
    });
  });

});

describe('Generate icons', () => {
  it('should be able to generate the iOS icons', () => {
    generate().then(result => {
      expect(result).to.equal({
        icons: "Blah"
      });
    });
  });
});
