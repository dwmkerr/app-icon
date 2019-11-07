const { expect } = require('chai');
const path = require('path');
const deleteFolderIfExists = require('../utils/delete-folder-if-exists');
const generateManifestAdaptiveIcons = require('./generate-manifest-adaptive-icons');
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
  './res/mipmap-anydpi-v26',
];

//  The files we expect in each of the folders above.
const expectedFiles = [
  './ic_launcher.xml',
  './ic_launcher_round.xml',
  './ic_launcher_background.png',
  './ic_launcher_foreground.png',
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

describe('generate-manifest-adaptive-icons', () => {
  //  Run each test.
  testManifests.forEach(({ projectName, manifestPath }) => {
    it(`should be able to generate adaptive icons for the ${projectName} manifest`, async () => {
      //  Get the manifest folder, create an array of every icon we expect to see.
      const manifestFolder = path.dirname(manifestPath);
      const resourceFolders = expectedFolders.map((f) => path.join(manifestFolder, f));
      const resourceFoldersFiles = resourceFolders.reduce((allFiles, folder) => {
        expectedFiles.forEach((ef) => allFiles.push(path.join(folder, ef)));
        return allFiles;
      }, []);

      //  A bit of a hack here - the 'anydpi' folder should not contain any images,
      //  it just references the other mipmaps. So remove the anydpi folder images
      //  from the expected set of files.
      const expectedPaths = resourceFoldersFiles.filter((f) => !(/anydpi.*png$/.test(f)));
      console.log(`Len: ${resourceFoldersFiles.length}`);
      expectedPaths.forEach((f) => console.log(`Expecting: ${f}`));

      //  Delete all of the folders we're expecting to create, then generate the icons.
      await Promise.all(resourceFolders.map(deleteFolderIfExists));
      await (generateManifestAdaptiveIcons(backgroundIcon, foregroundIcon, manifestPath));
      const filesDoExist = await Promise.all(expectedPaths.map(fileExists));
      filesDoExist.forEach((exists, index) => {
        expect(exists, `${resourceFoldersFiles[index]} should be generated`).to.equal(true);
      });
    });
  });
});
