// We use Node 4 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const program = require('commander');
const commandExists = require('command-exists');
const fs = require('fs');
const pack = require('../package.json');
const generate = require('./generate');

//  This is the main app-icon program. It takes command line arguments and runs
//  the appropriate operations. Output is logged to stdout, errors to stderr.
function appIcon(argv) {
  //  Validate the input parameters, showing the commandline options if needed.
  program
    .version(pack.version)
    .option('-i, --icon [optional]', "The icon to use. Defaults to 'icon.png'")
    .option('-s, --search [optional]', "The folder to search from. Defaults to './'")
    .parse(argv);

  //  Get our parameters.
  const sourceIcon = program.icon || 'icon.png';
  const searchRoot = program.search || './';

  //  Check that we have imagemagick installed.
  commandExists('convert', (err, imageMagickInstalled) => {
    if (err) throw err;
    if (!imageMagickInstalled) {
      console.error('  Error: ImageMagick must be installed. Try:');
      console.error('    brew install imagemagick');
      return process.exit(1);
    }

    //  Check that we have a source icon.
    return fs.stat(sourceIcon, (statErr) => {
      if (statErr && statErr.code === 'ENOENT') {
        console.error(`Source file '${sourceIcon}' does not exist. Add the file or specify source icon with the '--icon' paramter.`);
        return process.exit(1);
      }

      //  Generate some icons then innit.
      return generate(searchRoot, sourceIcon)
        .then(() => {
        })
        .catch((generateErr) => {
          console.error('An error occurred generating the icons...');
          console.log(generateErr);
          throw generateErr;
        });
    });
  });
}

//  Export the main app icon function.
module.exports = {
  appIcon,
};
