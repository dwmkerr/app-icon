const { expect } = require('chai');
const generateIconsetIcons = require('./generate-iconset-icons');
const deleteIfExists = require('../utils/delete-if-exists');
const fileExists = require('../utils/file-exists');

const sourceIcon = './test/icon.png';

describe('generate-iconset-icons', () => {
  it('should be able to generate icons for the React Native iconset', async () => {
    const files = [
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-40x40-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-29x29-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-29x29-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-60x60-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-57x57-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-29x29-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-57x57-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-40x40-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/iphone-29x29-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-40x40-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-50x50-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-50x50-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-72x72-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-72x72-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-76x76-1x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ipad-76x76-2x.png',
      'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/ios-marketing-1024x1024-1x.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    await Promise.all(files.map(deleteIfExists));
    await (generateIconsetIcons(sourceIcon, 'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset'));
    const filesDoExist = await Promise.all(files.map(fileExists));
    filesDoExist.forEach((exists, index) => {
      expect(exists, `${files[index]} should be generated`).to.equal(true);
    });
  });

  it('should be able to generate icons for the Cordova iconset', async () => {
    const files = [
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-40x40-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-29x29-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-29x29-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-60x60-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-57x57-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-57x57-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-40x40-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-29x29-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-29x29-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-40x40-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-50x50-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-50x50-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-72x72-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-72x72-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-76x76-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-76x76-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ios-marketing-1024x1024-1x.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    await Promise.all(files.map(deleteIfExists));
    await (generateIconsetIcons(sourceIcon, 'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset'));
    const filesDoExist = await Promise.all(files.map(fileExists));
    filesDoExist.forEach((exists, index) => {
      expect(exists, `${files[index]} should be generated`).to.equal(true);
    });
  });

  it('should be able to generate icons for the Native iconset', async () => {
    const files = [
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-40x40-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-29x29-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-29x29-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-60x60-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-57x57-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-57x57-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-40x40-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-29x29-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-29x29-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-40x40-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-50x50-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-50x50-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-72x72-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-72x72-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-76x76-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-76x76-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ios-marketing-1024x1024-1x.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    await Promise.all(files.map(deleteIfExists));
    await (generateIconsetIcons(sourceIcon, 'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset'));
    const filesDoExist = await Promise.all(files.map(fileExists));
    filesDoExist.forEach((exists, index) => {
      expect(exists, `${files[index]} should be generated`).to.equal(true);
    });
  });
});
