const fs = require('fs');
const expect = require('chai').expect;
const generateIconsetIcons = require('./generate-iconset-icons');

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
}

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
    ];

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateIconsetIcons('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
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
    ];

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateIconsetIcons('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
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
    ];

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateIconsetIcons('test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
  });
});
