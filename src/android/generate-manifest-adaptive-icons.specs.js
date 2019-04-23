const path = require('path');
const { expect } = require('chai');
const generateManifestAdaptiveIcons = require('./generate-manifest-adaptive-icons');
const deleteIfExists = require('../utils/delete-if-exists');
const fileExists = require('../utils/file-exists');

const backgroundIcon = './test/icon.background.png';
const foregroundIcon = './test/icon.foreground.png';

//  The folders we expect to generate, relative to the manifest location.
const expectedFolders = [
  './res/mipmap-ldpi-v26',
  './res/mipmap-hdpi-v26',
  './res/mipmap-mdpi-v26',
  './res/mipmap-xhdpi-v26',
  './res/mipmap-xxhdpi-v26',
  './res/mipmap-xxxhdpi-v26',
];

//  The files we expect in each of the folders above.
const expectedFiles = [
  './ic_launcher.xml',
  './ic_launcher_background.png',
  './ic_launcher_foreground.png',
];

describe.only('generate-manifest-adaptive-icons', () => {
  it('should be able to generate adaptive icons for the React Native manifest', () => {
    //  Define the path to the manifest, and it's folder.
    const manifestPath = './test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml';
    const manifestFolder = path.dirname(manifestPath);
    const resourceFolders = expectedFolders.map(f => path.join(manifestFolder, f));
    const resourceFoldersFiles = resourceFolders.reduce((allFiles, folder) => {
      expectedFiles.forEach(ef => allFiles.push(path.join(folder, ef)));
      return allFiles;
    }, []);

    //  Delete all of the folders we're expecting to create, then generate them.
    return Promise.all(resourceFolders.map(f => deleteIfExists(f)))
      .then(() => (
        generateManifestAdaptiveIcons(backgroundIcon, foregroundIcon, manifestPath)
      ))
      .then(() => Promise.all(resourceFoldersFiles.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${resourceFoldersFiles[index]} should be generated`).to.equal(true);
        });
      });
  });

  // it('should be able to generate icons for the Cordova manifest', () => {
    // const files = [
      // 'test/CordovaApp/platforms/android/res/mipmap-ldpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-ldpi/ic_launcher_round.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-hdpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-hdpi/ic_launcher_round.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-mdpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-mdpi/ic_launcher_round.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xhdpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xhdpi/ic_launcher_round.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xxhdpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xxhdpi/ic_launcher_round.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xxxhdpi/ic_launcher.png',
      // 'test/CordovaApp/platforms/android/res/mipmap-xxxhdpi/ic_launcher_round.png',
    // ];

    // //  Delete all of the files we're expecting to create, then generate them.
    // return Promise.all(files.map(f => deleteIfExists(f)))
      // .then(() => (
        // generateManifestIcons(sourceIcon, 'test/CordovaApp/platforms/android/AndroidManifest.xml')
      // ))
      // .then(() => Promise.all(files.map(fileExists)))
      // .then((filesDoExist) => {
        // filesDoExist.forEach((exists, index) => {
          // expect(exists, `${files[index]} should be generated`).to.equal(true);
        // });
      // });
  // });

  // it('should be able to generate icons for the Native manifest', () => {
    // const files = [
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-ldpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-ldpi/ic_launcher_round.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-hdpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-hdpi/ic_launcher_round.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-mdpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-mdpi/ic_launcher_round.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xhdpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xhdpi/ic_launcher_round.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
      // 'test/NativeApp/android/native_app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png',
    // ];

    // //  Delete all of the files we're expecting to create, then generate them.
    // return Promise.all(files.map(f => deleteIfExists(f)))
      // .then(() => (
        // generateManifestIcons(sourceIcon, 'test/NativeApp/android/native_app/src/main/AndroidManifest.xml')
      // ))
      // .then(() => Promise.all(files.map(fileExists)))
      // .then((filesDoExist) => {
        // filesDoExist.forEach((exists, index) => {
          // expect(exists, `${files[index]} should be generated`).to.equal(true);
        // });
      // });
  // });
});
