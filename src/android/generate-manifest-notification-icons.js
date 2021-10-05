const path = require('path');
const mkdirp = require('mkdirp');

const androidManifestNotificationIcons = require('./AndroidManifest.notification-icons.json');
const resizeImage = require('../resize/resize-image');
const monochromeImage = require('../color/monochrome-image');

//  Generate Android Manifest icons given a manifest file.
module.exports = async function generateManifestIcons(notificationIcon, manifest) {
  //  Create the object we will return.
  const results = {
    icons: [],
  };

  //  We've got the manifest file, get the parent folder.
  const manifestFolder = path.dirname(manifest);

  //  Generate each image in the full icon set, updating the contents.
  await Promise.all(androidManifestNotificationIcons.notificationIcons.map(async (icon) => {
    const iconPathWithFileName = icon.path.replace('<originalFileName>', path.basename(notificationIcon));
    const targetPath = path.join(manifestFolder, iconPathWithFileName);

    //  Each icon lives in its own folder, so we'd better make sure that folder
    //  exists.
    await mkdirp(path.dirname(targetPath));
    results.icons.push(iconPathWithFileName);

    return resizeImage(notificationIcon, targetPath, icon.size)
      .then(() => monochromeImage(targetPath, targetPath, 'white'));
  }));
  //  Before writing the contents file, sort the contents (otherwise
  //  they could be in a different order each time).
  results.icons.sort();
  return results;
};
