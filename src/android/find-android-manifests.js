const find = require('../utils/find');

//  Given a search root, finds all iOS iconsets.
module.exports = function findAndroidManifests(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  Exclude: node modules and android build intermediates.
    if (file.match(/node_modules/)) return false;
    if (file.match(/\/build\//)) return false;

    //  Only grab the manifest file...
    return file.match(/AndroidManifest.xml/) && !stat.isDirectory();
  });
};
