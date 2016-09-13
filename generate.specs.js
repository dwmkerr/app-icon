/* eslint-env node, mocha */
const fs = require('fs');
const expect = require('chai').expect;
const { 
  findIconSets,
  findAndroidManifests,
  generateManifestIcons,
  generateIconSetIcons,
  generate
} = require('./generate');

describe('Find Icon Sets', () => {
  it('should be able to find the iOS iconsets', () => {
    return findIconSets('./').then(iconSets => {
      expect(iconSets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should not find any iconsets in the node_modules/ folder', () => {
    return findIconSets('./').then(iconSets => {
      iconSets.forEach(is => expect(is).not.to.match(/node_modules/));
    });
  });

  it('should be able to find the Android Manifest', () => {
    return findAndroidManifests('./').then(manifests => {
      expect(manifests).to.include('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
    });
  });

});

describe('Generate iconset icons', () => {
  it('should be able to generate icons for the test icon set', () => {
    return generateIconSetIcons('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
  });
});

describe('Generate manifest icons', () => {
  it('should be able to generate icons for the test manifest', () => {
    return generateManifestIcons('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
  });
});

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if(err === null) return resolve(true);
      if(err && err.code === 'ENOENT') return resolve(false);
      reject(err);
    });
  });
}

//  The files we'll generate if we successfully generate icons...
const files = [
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-29-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-29x29-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-29x29-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-40x40-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-40x40-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-50x50-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-50x50-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-57x57-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-57x57-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-60x60-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-72x72-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-72x72-2x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-76x76-1x.png',
  'test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset/icon-76x76-2x.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-hdpi/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-ldpi/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-mdpi/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-xhdpi/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-xxhdpi/icon.png',
  'test/ReactNativeIconTest/android/app/src/main/res/drawable-xxxhdpi/icon.png'
];

describe('Generate', () => {
  it('should generate icons for all of the test projects', () => {

    //  Delete all of the files we're expecting to create...
    files.forEach(file => fs.unlinkSync);

    //  Generate the icons, then check each expected file exists.
    return generate().then((results) => {
      return Promise.all(files.map(file => {
        return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true)); 
      }));
    });
  });
});
