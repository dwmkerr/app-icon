const { expect } = require('chai');
const path = require('path');
const generateManifestNotificationIcons = require('./generate-manifest-notification-icons');
const deleteFolderIfExists = require('../utils/delete-folder-if-exists');
const fileExists = require('../utils/file-exists');

const notificationIcon = './test/notification.png';

//  The folders we expect to generate, relative to the manifest location.
const expectedFolders = [
  './res/drawable-hdpi',
  './res/drawable-mdpi',
  './res/drawable-xhdpi',
  './res/drawable-xxhdpi',
  './res/drawable-xxxhdpi',
];

//  The files we expect in each of the folders above.
const expectedFiles = [
  './ic_stat_notification.png',
];

//  Create a test for each manifest.
const testManifests = [{
  projectName: 'React Native Manifest',
  manifestPath: './test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml',
}, {
  projectName: 'Cordova Manifest',
  manifestPath: './test/CordovaApp/platforms/android/src/main/AndroidManifest.xml',
}, {
  projectName: 'Native Manifest',
  manifestPath: './test/NativeApp/android/native_app/src/main/AndroidManifest.xml',
}];

describe('generate-manifest-notification-icons', () => {
  //  Run each test.
  testManifests.forEach(({ projectName, manifestPath }) => {
    it(`should be able to generate notification icons for the ${projectName} manifest`, async () => {
      //  Get the manifest folder, create an array of every icon we expect to see.
      const manifestFolder = path.dirname(manifestPath);
      const resourceFolders = expectedFolders.map((f) => path.join(manifestFolder, f));
      const resourceFoldersFiles = resourceFolders.reduce((allFiles, folder) => {
        expectedFiles.forEach((ef) => allFiles.push(path.join(folder, ef)));
        return allFiles;
      }, []);

      //  Delete all of the folders we're expecting to create, then generate the icons.
      await Promise.all(resourceFolders.map(deleteFolderIfExists));
      await generateManifestNotificationIcons(notificationIcon, manifestPath);
      const filesDoExist = await Promise.all(resourceFoldersFiles.map(fileExists));
      filesDoExist.forEach((exists, index) => {
        expect(exists, `${resourceFoldersFiles[index]} should be generated`).to.equal(true);
      });
    });
  });
});
