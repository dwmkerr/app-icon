const fs = require('fs');
const expect = require('chai').expect;
const generateManifestIcons = require('./generate-manifest-icons');

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
}

describe('generate-manifest-icons', () => {
  it('should be able to generate icons for the React Native manifest', () => {
    const files = [
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
      'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    ];

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateManifestIcons('./test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
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

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateManifestIcons('test/CordovaApp/platforms/android/AndroidManifest.xml')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
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

    //  Delete all of the files we're expecting to create...
    //  TODO: new to replace this with a 'delete if exists' or something...
    // files.forEach(fs.unlinkSync);

    return generateManifestIcons('test/NativeApp/android/native_app/src/main/AndroidManifest.xml')
      .then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
  });
});
