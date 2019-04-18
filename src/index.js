const generate = require('./generate');
const labelImage = require('./label/label-image');
const androidManifestIcons = require('./android/AndroidManifest.icons.json');
const AppIconIconSet = require('./ios/AppIcon.iconset.Contents.template.json');

module.exports = {
  labelImage,
  generate,
  templates: {
    'AndroidManifest.icons': androidManifestIcons,
    'AppIcon.iconset': AppIconIconSet,
  },
};
