const fs = require('fs');
const { promisify } = require('util');
const imagemagickCli = require('imagemagick-cli');
const getImageWidth = require('../imagemagick/get-image-width');

const copyFileAsync = promisify(fs.copyFile);

/**
 * init - creates an icon from a template.
 *
 * @param template
 * @param output
 * @param options
 * @returns a promise which resolves when the icon has been created.
 */
async function init(template, output, options) {
  //  If there is no caption, then we can just copy the image.
  const caption = (options && options.caption) || '';
  if (!caption) return copyFileAsync(template, output);

  //  We have a caption, so we'll need to get the image width to work out how
  //  to arrange it on the icon.
  const width = await getImageWidth(template);
  //  The height will be 80% of the width, i.e. the text almost fills the icon.
  //  TODO: getImageWidth should be getImageDimensions
  const w = Math.floor(width * 0.8);
  const h = Math.floor(width * 0.8);

  //  Create the command to generate the image.
  const command = `convert \
        -background "rgba(0,0,0,0)" -fill white \
        -gravity center -size ${w}x${h} \
        -stroke black -strokewidth 2 caption:"${caption}" \
        ${template} +swap -composite ${output}`;
  return imagemagickCli.exec(command);
}

module.exports = init;
