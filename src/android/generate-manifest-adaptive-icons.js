const path = require('path');
const fs = require('fs');
const { EOL } = require('os');
const mkdirp = require('mkdirp');

const androidManifestAdaptiveIcons = require('./AndroidManifest.adaptive-icons.json');
const resizeImage = require('../resize/resize-image');

//  The XML for the ic launcher manifest.
//  eslint-disable-next-line
const icLauncherManifestXml =
    `<?xml version="1.0" encoding="utf-8"?>${EOL}`
  + `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">${EOL}`
  + `    <background android:drawable="@mipmap/ic_launcher_background" />${EOL}`
  + `    <foreground android:drawable="@mipmap/ic_launcher_foreground" />${EOL}`
  + `</adaptive-icon>${EOL}`;

//  Generate Android Manifest icons given a manifest file.
module.exports = function generateManifestIcons(backgroundIcon, foregroundIcon, manifest) {
  //  Create the object we will return.
  const results = {
    icons: [],
  };

  //  We've got the manifest file, get the parent folder.
  const manifestFolder = path.dirname(manifest);

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(androidManifestAdaptiveIcons.adaptiveIcons.map((icon) => {
    //  Each icon lives in its own folder, so we'd better make sure that folder
    //  exists.
    return new Promise((resolve, reject) => {
      const resourceFolder = path.join(manifestFolder, icon.folder);
      mkdirp(resourceFolder, (err) => {
        if (err) return reject(err);

        //  Create the manifests, for the normal icons and round icons.
        fs.writeFileSync(path.join(resourceFolder, 'ic_launcher.xml'), icLauncherManifestXml, 'utf8');
        fs.writeFileSync(path.join(resourceFolder, 'ic_launcher_round.xml'), icLauncherManifestXml, 'utf8');

        const operations = [];
        //  If the manifest requires us to generate icons for the folder, do so.
        //  Not *every* folder has icons - for example the 'anydpi' folder will
        //  not contain icons.
        if (icon.backgroundIcon) {
          const backgroundOutput = path.join(resourceFolder, icon.backgroundIcon);
          operations.push(resizeImage(backgroundIcon, backgroundOutput, icon.size));
          results.icons.push(backgroundOutput);
        }
        if (icon.foregroundIcon) {
          const foregroundOutput = path.join(resourceFolder, icon.foregroundIcon);
          operations.push(resizeImage(foregroundIcon, foregroundOutput, icon.size));
          results.icons.push(foregroundOutput);
        }
        return resolve(Promise.all(operations));
      });
    });
  })).then(() => {
    //  Before writing the contents file, sort the contents (otherwise
    //  they could be in a different order each time).
    results.icons.sort();
    return results;
  });
};
