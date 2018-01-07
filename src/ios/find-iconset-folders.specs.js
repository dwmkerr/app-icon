const { expect } = require('chai');
const findIconsetFolders = require('./find-iconset-folders');

describe('find-iconset-folders', () => {
  it('should not find any iconsets in the node_modules/ folder', () => {
    return findIconsetFolders('./node_modules').then((iconsets) => {
      expect(iconsets.length).to.equal(0);
    });
  });

  it('should be able to find the React Native iconset', () => {
    return findIconsetFolders('./test/ReactNativeIconTest').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the React Native iconset with a deep search path', () => {
    return findIconsetFolders('./test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the Cordova iconset', () => {
    return findIconsetFolders('./test/CordovaApp').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the Native iconset', () => {
    return findIconsetFolders('./test/NativeApp').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset');
    });
  });
});
