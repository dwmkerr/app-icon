const childProcess = require('child_process');
const getImageWidth = require('./get-image-width');

//  Use imagemagick to label an image. Gravity should be 'north' or 'south'.
function label(input, output, label, gravity) {
  return new Promise((resolve, reject) => {
    //  Get the image width.
    getImageWidth(input)
      .then((width) => {
        //  The height is a fifth of the width.
        const height = width / 5;
        const command = `convert \
          -background '#0008' -fill white \
          -gravity center -size ${width}x${height} \
          caption:"${label}" \
          ${input} +swap -gravity ${gravity} -composite ${output}`;
        childProcess.exec(command, (err) => {
          if (err) {
            console.log(`child processes failed with error code: ${err.code}`);
            return reject(err);
          }

          return resolve();
        });
      })
      .catch(reject);
  });
}

//  Single function to label an image (optionally top and bottom).
module.exports = function labelImage(input, output, top, bottom) {
  if (top && bottom) {
    return label(input, output, top, 'north')
      .then(() => label(output, output, bottom, 'south'));
  } else if (top) {
    return label(input, output, top, 'north');
  } else if (bottom) {
    return label(input, output, bottom, 'south');
  }

  throw new Error("When labeling an image, a 'top' or 'bottom' must be specified.");
};
