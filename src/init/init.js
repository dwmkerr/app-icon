const imagemagickCli = require('imagemagick-cli');
const getImageWidth = require('../imagemagick/get-image-width');

/**
 * init - creates an icon from a template.
 *
 * @param template
 * @param output
 * @param options
 * @returns a promise which resolves when the icon has been created.
 */
function init(template, output, options) {
  //  Get the image width.
  return getImageWidth(template)
    .then((width) => {
      //  The height will be 80% of the width, i.e. the text almost fills the icon.
      //  TODO: getImageWidth should be getImageDimensions
      const w = Math.floor(width * 0.8);
      const h = Math.floor(width * 0.8);
      const caption = (options && options.caption) || '';

      //  Create the command to generate the image.
      const command = `convert \
            -background "rgba(0,0,0,0)" -fill white \
            -gravity center -size ${w}x${h} \
            caption:"${caption}" \
            ${template} +swap -composite ${output}`;
      return imagemagickCli.exec(command);
    });
}

module.exports = init;
