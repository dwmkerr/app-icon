#!/usr/bin/env node

// We use Node 4 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const chalk = require('chalk');
const program = require('commander');
const pack = require('../package.json');
const isImagemagickInstalled = require('../src/imagemagick/is-imagemagick-installed');
const generate = require('../src/generate');
const labelImage = require('../src/label/label-image');
const fileExists = require('../src/utils/file-exists');

//  Create the program.
program
  .version(pack.version);

//  Define the 'generate' command.
program
  .command('generate')
  .description('Generate all app icons from a single input icon')
  .option('-i, --icon [icon]', "The icon to use. Defaults to 'icon.png'", 'icon.png')
  .option('-s, --search [optional]', "The folder to search from. Defaults to './'", './')
  .option('-p, --platforms [optional]', "The platforms to generate icons for. Defaults to 'android,ios'", 'android,ios')
  .action(({ icon, search, platforms }) => {
    isImagemagickInstalled()
      .catch((err) => { throw err; })
      .then((imageMagickInstalled) => {
        if (!imageMagickInstalled) {
          console.error('  Error: ImageMagick must be installed. Try:');
          console.error('    brew install imagemagick');
          return process.exit(1);
        }

        //  Check that we have a source icon.
        return fileExists(icon);
      })
      .then((exists) => {
        if (!exists) {
          console.error(`Source file '${icon}' does not exist. Add the file or specify source icon with the '--icon' parameter.`);
          return process.exit(1);
        }
        //  Generate some icons.
        return generate({ sourceIcon: icon, search, platforms });
      })
      .catch((generateErr) => {
        console.error(chalk.red(`An error occurred generating the icons: ${generateErr.message}`));
        return process.exit(1);
      });
  });

//  Define the 'label' command.
program
  .command('label')
  .description('Adds a label to an icon image.')
  .option('-i, --input <input>', "The input image, .e.g 'icon.png'.")
  .option('-o, --output <output>', "The output image, .e.g 'icon-out.png'.")
  .option('-t, --top [top]', "The label to put on the top of the image, .e.g 'qa'.")
  .option('-b, --bottom [bottom]', "The label to put on the bottom of the image, .e.g '1.2.5'.")
  .action(({ input, output, top, bottom }) => {
    isImagemagickInstalled()
      .catch((err) => { throw err; })
      .then((imageMagickInstalled) => {
        if (!imageMagickInstalled) {
          console.error('  Error: ImageMagick must be installed. Try:');
          console.error('    brew install imagemagick');
          return process.exit(1);
        }

        //  Check that we have a input file.
        return fileExists(input);
      })
      .then((exists) => {
        if (!exists) {
          console.error(`Input file '${input}' does not exist.`);
          return process.exit(1);
        }
        //  Generate some icons then innit.
        return labelImage(input, output, top, bottom);
      })
      .catch((labelErr) => {
        console.error('An error occurred labelling the icon...');
        console.log(labelErr);
        return process.exit(1);
      });
  });

//  Extend the help with some examples.
program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ app-icon generate');
  console.log('    $ app-icon generate -i myicon.png -s ./app/cordova-app');
  console.log('    $ app-icon label -i myicon.png -o myicon.out.png -t qa -b 1.2.3');
  console.log('');
});

//  Parse the arguments. If we have no subcommand, show the help.
program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
