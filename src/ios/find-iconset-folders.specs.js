const { expect } = require('chai');
const path = require('path');
const findIconsetFolders = require('./find-iconset-folders');

describe('find-iconset-folders', () => {
  it('should not find any iconsets in the node_modules/ folder', async () => {
    const iconsets = await findIconsetFolders('./node_modules');
    expect(iconsets.length).to.equal(0);
  });

  it('should be able to find the React Native iconset', async () => {
    const iconsets = await findIconsetFolders('./test/ReactNativeIconTest');
    expect(iconsets.length).to.equal(1);
    expect(iconsets).to.include(path.normalize('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset'));
  });

  it('should be able to find the React Native iconset with a deep search path', async () => {
    const iconsets = await findIconsetFolders('./test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets');
    expect(iconsets.length).to.equal(1);
    expect(iconsets).to.include(path.normalize('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset'));
  });

  it('should be able to find the Cordova iconset', async () => {
    const iconsets = await findIconsetFolders('./test/CordovaApp');
    expect(iconsets.length).to.equal(1);
    expect(iconsets).to.include(path.normalize('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset'));
  });

  it('should be able to find the Native iconset', async () => {
    const iconsets = await findIconsetFolders('./test/NativeApp');
    expect(iconsets.length).to.equal(1);
    expect(iconsets).to.include(path.normalize('test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset'));
  });
});
