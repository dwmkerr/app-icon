const { expect } = require('chai');
const path = require('path');
const findAndroidManifests = require('./find-android-manifests');

describe('find-android-manifests', () => {
  it('should not find any manifests in the node_modules/ folder', async () => {
    const manifests = await findAndroidManifests('./node_modules');
    expect(manifests.length).to.equal(0);
  });

  it('should be able to find the React Native manifest', async () => {
    const manifests = await findAndroidManifests('./test/ReactNativeIconTest');
    expect(manifests.length).to.equal(1);
    expect(manifests).to.include(path.normalize('test/ReactNativeIconTest/android/app/src/main/AndroidManifest.xml'));
  });

  it('should be able to find the Cordova manifest', async () => {
    const manifests = await findAndroidManifests('./test/CordovaApp');
    expect(manifests.length).to.equal(1);
    expect(manifests).to.include(path.normalize('test/CordovaApp/platforms/android/AndroidManifest.xml'));
    expect(manifests).to.not.include(path.normalize('test/CordovaApp/platforms/android/CordovaLib/AndroidManifest.xml'));
  });

  it('should be able to find the Native manifest', async () => {
    const manifests = await findAndroidManifests('./test/NativeApp');
    expect(manifests.length).to.equal(1);
    expect(manifests).to.include(path.normalize('test/NativeApp/android/native_app/src/main/AndroidManifest.xml'));
  });
});
