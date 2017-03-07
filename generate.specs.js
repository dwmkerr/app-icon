/* eslint-env node, mocha */
const fs = require('fs');
const expect = require('chai').expect;
const generateFunctions = require('./generate');

//  Grab the functions we're testing.
const findIconSets = generateFunctions.findIconSets;
const findAndroidManifests = generateFunctions.findAndroidManifests;
const generateManifestIcons = generateFunctions.generateManifestIcons;
const generateIconSetIcons = generateFunctions.generateIconSetIcons;
const generate = generateFunctions.generate;

function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
}

describe('Find Icon Sets', () => {
  it('should not find any iconsets in the node_modules/ folder', () => {
    return findIconSets('./').then((iconSets) => {
      iconSets.forEach(is => expect(is).not.to.match(/node_modules/));
    });
  });

  it('should be able to find the iOS iconsets', () => {
    return findIconSets('./').then((iconSets) => {
      expect(iconSets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the iOS iconsets with a deep search path', () => {
    return findIconSets('./test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets').then((iconSets) => {
      expect(iconSets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the Android Manifest', () => {
    return findAndroidManifests('./').then((manifests) => {
      expect(manifests).to.include('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
    });
  });

  it('should be able to find the Android Manifest with a deep search path', () => {
    return findAndroidManifests('./test/ReactNativeIconTest/android/app/src/main').then((manifests) => {
      expect(manifests).to.include('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml');
    });
  });
});

describe('React Native', () => {
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

  //  The files we'll generate if we successfully generate icons...
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
    'test/ReactNativeIconTest/android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
    'test/ReactNativeIconTest/android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
    'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
    'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
    'test/ReactNativeIconTest/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
  ];

  describe('Generate', () => {
    it('should generate icons for all of the test projects', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/ReactNativeIconTest').then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });

    it('should generate icons for the android project only with a search path', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/ReactNativeIconTest/android/app/src/main').then(() => {
        return Promise.all(files.filter(f => f.match(/android/)).map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });
  });
});

describe('Cordova', () => {
  describe('Generate iconset icons', () => {
    it('should be able to generate icons for the test icon set', () => {
      return generateIconSetIcons('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset');
    });
  });

  describe('Generate manifest icons', () => {
    it('should be able to generate icons for the test manifest', () => {
      return generateManifestIcons('test/CordovaApp/platforms/android/AndroidManifest.xml');
    });
  });

  //  The files we'll generate if we successfully generate icons...
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
    'test/CordovaApp/platforms/android/res/mipmap-hdpi/ic_launcher.png',
    'test/CordovaApp/platforms/android/res/mipmap-mdpi/ic_launcher.png',
    'test/CordovaApp/platforms/android/res/mipmap-xhdpi/ic_launcher.png',
    'test/CordovaApp/platforms/android/res/mipmap-xxhdpi/ic_launcher.png',
    'test/CordovaApp/platforms/android/res/mipmap-xxxhdpi/ic_launcher.png',
  ];

  describe('Generate', () => {
    it('should generate icons for the test project', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/CordovaApp').then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });

    it('should generate icons for the android project only with a search path', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/CordovaApp/platforms/android/').then(() => {
        return Promise.all(files.filter(f => f.match(/android/)).map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });
  });
});

describe('Native', () => {
  describe('Generate iconset icons', () => {
    it('should be able to generate icons for the test icon set', () => {
      return generateIconSetIcons('test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset');
    });
  });

  describe('Generate manifest icons', () => {
    it('should be able to generate icons for the test manifest', () => {
      return generateManifestIcons('test/NativeApp/android/native_app/src/main/AndroidManifest.xml');
    });
  });

  //  The files we'll generate if we successfully generate icons...
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
    'test/NativeApp/android/native_app/src/main/res/mipmap-hdpi/ic_launcher.png',
    'test/NativeApp/android/native_app/src/main/res/mipmap-mdpi/ic_launcher.png',
    'test/NativeApp/android/native_app/src/main/res/mipmap-xhdpi/ic_launcher.png',
    'test/NativeApp/android/native_app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
    'test/NativeApp/android/native_app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
  ];

  describe('Generate', () => {
    it('should generate icons for the test project', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/NativeApp').then(() => {
        return Promise.all(files.map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });

    it('should generate icons for the android project only with a search path', () => {
      //  Delete all of the files we're expecting to create...
      files.forEach(fs.unlinkSync);

      //  Generate the icons, then check each expected file exists.
      return generate('./test/NativeApp/android/').then(() => {
        return Promise.all(files.filter(f => f.match(/android/)).map((file) => {
          return fileExists(file).then(exists => expect(exists, `${file} should be generated`).to.equal(true));
        }));
      });
    });
  });
});
