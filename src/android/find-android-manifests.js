const path = require('path');
const debug = require('debug')('app-icon');
const find = require('../utils/find');

//  Create a regexp to exclude node modules, CordovaLib and build intermediates.
//  The build folder rex also needs to be able to handle windows paths.
const rexNodeModules = new RegExp('node_modules');
const rexCordovaLib = new RegExp('CordovaLib');
const rexBuildFolder = new RegExp(`${path.normalize('/build/').replace(/\\/g, '\\\\')}`);

//  Given a search root, finds all Android manifests.
module.exports = async function findAndroidManifests(searchRoot) {
  debug(`searching ${searchRoot} for android manifests`);
  const absoluteSearchRoot = path.resolve(searchRoot);
  return find(searchRoot, (file, stat) => {
    //  Anything which is a directory or does not end with 'AndroidManifest.xml'
    //  we can immediately ignore.
    if (!file.match(/AndroidManifest.xml/) || stat.isDirectory()) {
      //  No point debugging this, we'll just blat the screen with too much output.
      return false;
    }

    //  Exclude files which look like they might be in node_modules...
    if (file.match(rexNodeModules)) {
      debug(`skipping '${file}' as it appears to be in a node_modules folder...`);
      return false;
    }

    //  Exclude files which look like they might be in CordovaLib...
    if (file.match(rexCordovaLib)) {
      debug(`skipping '${file}' as it appears to be in a CordovaLib folder...`);
      return false;
    }

    //  When checking to see if a file is in the 'build' folder, we only want
    //  to check the _relative_ path - it is OK if the search root or parent
    //  path includes 'build'.
    const relativeFilePath = path.relative(absoluteSearchRoot, file);

    //  Exclude files which look like they might be in android build intermediate
    //  folders...
    if (relativeFilePath.match(rexBuildFolder)) {
      debug(`skipping '${file}' as it appears to be in an android build folder...`);
      return false;
    }

    return true;
  });
};
