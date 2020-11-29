const find = require('../utils/find');

//  Given a search root, finds all iOS iconsets.
module.exports = async function findIconsetFolders(searchRoot, iconSet) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if (file.match(/node_modules/)) return false;

    //  only grab the iconset folders.
    const iconsetPattern = '\/' + (iconSet || 'AppIcon') + '.appiconset$';
    const iconsetRegex = new RegExp(iconsetPattern);

    return file.match(iconsetRegex) && stat.isDirectory();
  });
};
