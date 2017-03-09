const expect = require('chai').expect;
const generateManifestIcons = require('./generate-manifest-icons');
const deleteIfExists = require('../utils/delete-if-exists');
const fileExists = require('../utils/file-exists');

describe('generate-manifest-icons', () => {
  it('should be able to generate icons for the React Native manifest', () => {
    const files = [
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(f => deleteIfExists(f)))
      .then(() => {
        return generateManifestIcons('./test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml')
        .then(() => {
          return Promise.all(files.map((file) => {
            return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
          }));
        });
      });
  });

  it('should be able to generate icons for the Cordova manifest', () => {
    const files = [
      'test/CordovaApp/platforms/android/res/mipmap-hdpi/ic_launcher.png',
      'test/CordovaApp/platforms/android/res/mipmap-mdpi/ic_launcher.png',
      'test/CordovaApp/platforms/android/res/mipmap-xhdpi/ic_launcher.png',
      'test/CordovaApp/platforms/android/res/mipmap-xxhdpi/ic_launcher.png',
      'test/CordovaApp/platforms/android/res/mipmap-xxxhdpi/ic_launcher.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(f => deleteIfExists(f)))
      .then(() => {
        return generateManifestIcons('test/CordovaApp/platforms/android/AndroidManifest.xml')
        .then(() => {
          return Promise.all(files.map((file) => {
            return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
          }));
        });
      });
  });

  it('should be able to generate icons for the Native manifest', () => {
    const files = [
      'test/NativeApp/android/native_app/src/main/res/mipmap-hdpi/ic_launcher.png',
      'test/NativeApp/android/native_app/src/main/res/mipmap-mdpi/ic_launcher.png',
      'test/NativeApp/android/native_app/src/main/res/mipmap-xhdpi/ic_launcher.png',
      'test/NativeApp/android/native_app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
      'test/NativeApp/android/native_app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(f => deleteIfExists(f)))
      .then(() => {
        return generateManifestIcons('test/NativeApp/android/native_app/src/main/AndroidManifest.xml')
        .then(() => {
          return Promise.all(files.map((file) => {
            return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
          }));
        });
      });
  });
});
