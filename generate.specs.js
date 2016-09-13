const expect = require('chai').expect;
const { findIconSets, generate } = require('./generate');

describe('Find Icon Sets', () => {
  it('should be able to find the iOS iconsets', () => {
    return findIconSets('./').then(iconSets => {
      expect(iconSets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });
});
