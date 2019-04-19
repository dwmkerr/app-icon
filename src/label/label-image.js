const imagemagickCli = require('imagemagick-cli');
const getImageWidth = require('../imagemagick/get-image-width');
const copyFile = require('../utils/copy-file');

/**
 * caption - add a caption to an image.
 *
 * @param input - the path to the input image.
 * @param output - the path to the output image.
 * @param label - the label or caption to add.
 * @param gravity - the position - any imagemagick 'gravity' value. Normally
 * 'north', 'south' or 'center'.
 * @param proportionalSize - the size of the total image which should be taken
 * up by the caption. e.g. 0.2 means 20% of the icon will have the caption.
 * @returns a promise which resolves with the result of the CLI command.
 */
function caption(input, output, label, gravity, proportionalSize) {
  //  Get the image width.
  return getImageWidth(input)
    .then((width) => {
      //  The height is a proportional amount of the of the width. This means
      //  with a square image, a proportionalSize of 0.2 and a gravity of 'bottom',
      //  the bottom 20% of the icon will contain the caption.
      const height = width * proportionalSize;

      //  Important: the quotes around the colour must be double quoutes for the
      //  command to work on Windows!
      const command = `convert \
        -background "rgba(0,0,0,0.5)" -fill white \
        -gravity center -size ${width}x${height} \
        caption:"${label}" \
        ${input} +swap -gravity ${gravity} -composite ${output}`;
      return imagemagickCli.exec(command);
    });
}

//  Single function to label an image (optionally top and bottom).
module.exports = function labelImage(input, output, top, bottom, middle) {
  //  First, create the output image. This will overwrite any existing file.
  let promise = copyFile(input, output);

  //  We'll have a set of promises which we will run, which will update the image.
  if (top) promise = promise.then(() => caption(output, output, top, 'north', 0.2));
  if (bottom) promise = promise.then(() => caption(output, output, bottom, 'south', 0.2));
  if (middle) promise = promise.then(() => caption(output, output, middle, 'center', 0.6));

  return promise;
};
