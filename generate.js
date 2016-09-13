const find = require('./find');

function findIconSets() {
  return find('./', (file, stat) => {
    //  Exclude node modules from the search.
    if(file.match(/node_modules/)) return false;

    //  Only grab the iconset folders.
    return file.match(/AppIcon.appiconset/) && stat.isDirectory();
  });
}

//  Generate xCode icons given an iconset folder.
function generateIconSetIcons(iconSet) {
  console.log(`Generating icons for iconset ${path.relative('./', iconSet)}...`);

  //  We've got the iconset folder. Get the contents Json.
  var contents = require(path.join(iconSet, 'Contents.json'));
  contents.images = [];

  //  Generate each image in the full icon set, updating the contents.
  return Promise.all(fullIconSet.images.map(image => {
    const targetName = `icon-${image.size}-${image.scale}.png`;
    const targetPath = path.join(iconSet, targetName);
    console.log(`Generating ${targetName} from icon.png...`);
    return generateIcon("icon.png", targetPath, image.size)
      .then(() => {
        contents.images.push({
          size: image.size,
          idiom: image.idiom,
          scale: image.scale,
          filename: targetName
        });
      });
  }));
}

function generate() {
  return findIconSets()
    .then(iconSets => {
      return Promise.all(iconSets.map(generateIconSetIcons));
    });
}

const fullIconSet = {
  images: [{
    size: 29, idiom: "iphone", scale: "2x"
  }]
};

module.exports = {
  findIconSets,
  generate
};
