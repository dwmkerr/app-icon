const path = require('path');
const mkdirp = require('mkdirp');

const androidManifestIcons = require('./AndroidManifest.icons.json');
const resizeImage = require('../resize/resize-image');

//  Generate Android Manifest icons given a manifest file.
module.exports = async function generateManifestIcons(sourceIcon, manifest, rounded) {
  //  Create the object we will return.
  const results = {
    icons: [],
  };

  //  We've got the manifest file, get the parent folder.
  const manifestFolder = path.dirname(manifest);

  function filterRounded(icon) {
    if (!rounded) return true;

    switch (rounded) {
      case 'only':
        return icon.path.indexOf('ic_launcher_round.png') !== -1;
      case 'none':
        return icon.path.indexOf('ic_launcher_round.png') === -1;
      default:
        return true;
    }
  }

  //  Generate each image in the full icon set, updating the contents.
  await Promise.all(androidManifestIcons.icons.filter(filterRounded).map(async (icon) => {
    const targetPath = path.join(manifestFolder, icon.path);

    //  Each icon lives in its own folder, so we'd better make sure that folder
    //  exists.
    await mkdirp(path.dirname(targetPath));
    results.icons.push(icon.path);

    return resizeImage(sourceIcon, targetPath, icon.size);
  }));
  //  Before writing the contents file, sort the contents (otherwise
  //  they could be in a different order each time).
  results.icons.sort();
  return results;
};
