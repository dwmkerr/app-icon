const expect = require('chai').expect;
const generateIconsetIcons = require('./generate-iconset-icons');
const deleteIfExists = require('../utils/delete-if-exists');
const fileExists = require('../utils/file-exists');

const sourceIcon = 'icon.png';

describe('generate-iconset-icons', () => {
  it('should be able to generate icons for the React Native iconset', () => {
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
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateIconsetIcons(sourceIcon, 'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset')
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });

  it('should be able to generate icons for the Cordova iconset', () => {
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
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateIconsetIcons(sourceIcon, 'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset')
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });

  it('should be able to generate icons for the Native iconset', () => {
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
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateIconsetIcons(sourceIcon, 'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset')
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });
});
