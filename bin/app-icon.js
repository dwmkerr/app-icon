#!/usr/bin/env node

// We use Node 6 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const chalk = require('chalk');
const program = require('commander');
const imagemagickCli = require('imagemagick-cli');
const path = require('path');
const pack = require('../package.json');
const generate = require('../src/generate');
const init = require('../src/init/init');
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
    imagemagickCli.getVersion()
      .then((version) => {
        if (!version) {
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
        return generate({ sourceIcon: icon, searchRoot: search, platforms });
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
  .action((parameters) => {
    const {
      input,
      output,
      top,
      bottom,
    } = parameters;

    imagemagickCli.getVersion()
      .then((version) => {
        if (!version) {
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

//  Define the 'init' command.
program
  .command('init')
  .description('Initialises app icons by creating simple icon templates')
  .option('-c, --caption [caption]', "An optional caption for the icon, e.g 'App'.")
  .option('--adaptive-icons', 'Additionally, generate Android Adaptive Icon templates')
  .action((params) => {
    const { caption, adaptiveIcons } = params;
    imagemagickCli.getVersion()
      .then((version) => {
        if (!version) {
          console.error('  Error: ImageMagick must be installed. Try:');
          console.error('    brew install imagemagick');
          return process.exit(1);
        }

        //  Create the icon from the template, captioned if needed.
        const input = path.resolve(__dirname, '../src/init/icon.template.png');
        return init(input, './icon.png', { caption })
          .then(() => console.log(`Created icon '${chalk.green('icon.png')}'`));
      })
      .then(() => {
        //  If we are going to use adaptive icons, create them.
        if (!adaptiveIcons) return;
        const inputBackground = path.resolve(__dirname, '../src/init/icon.background.template.png');
        const inputForeground = path.resolve(__dirname, '../src/init/icon.foreground.template.png');
        init(inputBackground, './icon.background.png')
          .then(() => init(inputForeground, './icon.foreground.png'))
          .then(() => {
            console.log(`Created icon '${chalk.green('icon.background.png')}'`);
            console.log(`Created icon '${chalk.green('icon.foreground.png')}'`);
          });
      })
      .catch((createError) => {
        console.error('An error occurred creating the icon...');
        console.log(createError);
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
  console.log('    $ app-icon init --caption "App"');
  console.log('    $ app-icon init --caption "App" --adaptive-icons');
  console.log('');
});

//  Parse the arguments. If we have no subcommand, show the help.
program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
