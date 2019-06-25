const path = require('path');
const find = require('../utils/find');

//  Create a regexp to exclude node modules and build intermediates. The build folder rex
//  also needs to be able to handle windows paths.
const rexNodeModules = new RegExp('node_modules');
const rexBuildFolder = new RegExp(`${path.normalize('/build/').replace(/\\/g, '\\\\')}`);

//  Given a search root, finds all Android manifests.
module.exports = async function findAndroidManifests(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  Exclude: node modules and android build intermediates.
    if (file.match(rexNodeModules)) return false;
    if (file.match(rexBuildFolder)) return false;

    //  Only grab the manifest file...
    return file.match(/AndroidManifest.xml/) && !stat.isDirectory();
  });
};
