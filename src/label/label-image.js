const callImagemagick = require('../imagemagick/call-imagemagick');
const getImageWidth = require('./get-image-width');

//  Use imagemagick to label an image. Gravity should be 'north' or 'south'.
function caption(input, output, label, gravity) {
  //  Get the image width.
  return getImageWidth(input)
    .then((width) => {
      //  The height is a fifth of the width.
      const height = width / 5;
      const command = `convert \
        -background '#0008' -fill white \
        -gravity center -size ${width}x${height} \
        caption:"${label}" \
        ${input} +swap -gravity ${gravity} -composite ${output}`;
      return callImagemagick(command);
    });
}

//  Single function to label an image (optionally top and bottom).
module.exports = function labelImage(input, output, top, bottom) {
  if (top && bottom) {
    return caption(input, output, top, 'north')
      .then(() => caption(output, output, bottom, 'south'));
  } else if (top) {
    return caption(input, output, top, 'north');
  } else if (bottom) {
    return caption(input, output, bottom, 'south');
  }

  return Promise.reject(Error("When labeling an image, a 'top' or 'bottom' must be specified."));
};
