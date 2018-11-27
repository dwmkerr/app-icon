const { expect } = require('chai');
const path = require('path');
const findAndroidManifests = require('./find-android-manifests');

describe('find-android-manifests', () => {
  it('should not find any manifests in the node_modules/ folder', () => {
    return findAndroidManifests('./node_modules').then((manifests) => {
      expect(manifests.length).to.equal(0);
    });
  });

  it('should be able to find the React Native manifest', () => {
    return findAndroidManifests('./test/ReactNativeIconTest').then((manifests) => {
      expect(manifests.length).to.equal(1);
      expect(manifests).to.include(path.normalize('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml'));
    });
  });

  it('should be able to find the Cordova manifests', () => {
    return findAndroidManifests('./test/CordovaApp').then((manifests) => {
      expect(manifests.length).to.equal(2);
      expect(manifests).to.include(path.normalize('test/CordovaApp/platforms/android/AndroidManifest.xml'));
      expect(manifests).to.include(path.normalize('test/CordovaApp/platforms/android/CordovaLib/AndroidManifest.xml'));
    });
  });

  it('should be able to find the Native manifest', () => {
    return findAndroidManifests('./test/NativeApp').then((manifests) => {
      expect(manifests.length).to.equal(1);
      expect(manifests).to.include(path.normalize('test/NativeApp/android/native_app/src/main/AndroidManifest.xml'));
    });
  });
});
