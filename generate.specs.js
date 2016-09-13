/* eslint-env node, mocha */
const expect = require('chai').expect;
const { 
  findIconSets,
  findAndroidManifests,
  generateManifestIcons,
  generateIconSetIcons,
  generate
} = require('./generate');

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

  it('should be able to find the Android Manifest', () => {
    return findAndroidManifests('./').then(manifests => {
      expect(manifests).to.include('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
    });
  });

});

describe('Generate iconset icons', () => {
  it('should be able to generate icons for the test icon set', () => {
    return generateIconSetIcons('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
  });
});

describe('Generate manifest icons', () => {
  it('should be able to generate icons for the test manifest', () => {
    return generateManifestIcons('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
  });
});
