#!/usr/bin/env node

/* eslint-disable consistent-return */

const chalk = require('chalk');
const program = require('commander');
const imagemagickCli = require('imagemagick-cli');
const path = require('path');
const pack = require('../package.json');
const generate = require('../src/generate');
const init = require('../src/init/init');
const labelImage = require('../src/label/label-image');
const fileExists = require('../src/utils/file-exists');

//  Helper to throw an error if a file doesn't exist.
const errorIfMissing = async (filePath, errorMessage) => {
  try {
    await fileExists(filePath);
  } catch (err) {
    console.error(`${chalk.red('error')}: ${errorMessage}`);
    return process.exit(1);
  }
};

const imageMagickCheck = async () => {
  const version = await imagemagickCli.getVersion();

  if (!version) {
    console.error('  Error: ImageMagick must be installed. Try:');
    console.error('    brew install imagemagick');
    return process.exit(1);
  }
};

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
  .option('--background-icon [optional]', "The background icon path. Defaults to 'icon.background.png'")
  .option('--foreground-icon [optional]', "The foreground icon path. Defaults to 'icon.foreground.png'")
  .option('--adaptive-icons [optional]', "Additionally, generate Android Adaptive Icon templates. Defaults to 'false'")
  .action(async (parameters) => {
    const {
      icon,
      backgroundIcon,
      foregroundIcon,
      search,
      platforms,
      adaptiveIcons,
    } = parameters;

    await imageMagickCheck();

    await errorIfMissing(icon, `Source file '${icon}' does not exist. Add the file or specify source icon with the '--icon' parameter.`);
    if (adaptiveIcons) {
      const checkPath = backgroundIcon || 'icon.background.png';
      await errorIfMissing(checkPath, `Background icon file '${checkPath}' does not exist. Add the file or specify background icon with the '--background-icon' parameter.`);
    }
    if (adaptiveIcons) {
      const checkPath = foregroundIcon || 'icon.foreground.png';
      await errorIfMissing(checkPath, `Foreground icon file '${checkPath}' does not exist. Add the file or specify foreground icon with the '--foreground-icon' parameter.`);
    }
    try {
      await generate({
        sourceIcon: icon,
        backgroundIcon,
        foregroundIcon,
        searchRoot: search,
        platforms,
        adaptiveIcons,
      });
    } catch (err) {
      console.error(chalk.red(`An error occurred generating the icons: ${err.message}`));
      process.exit(1);
    }
  });

//  Define the 'label' command.
program
  .command('label')
  .description('Adds a label to an icon image.')
  .option('-i, --input <input>', "The input image, .e.g 'icon.png'.")
  .option('-o, --output <output>', "The output image, .e.g 'icon-out.png'.")
  .option('-t, --top [top]', "The label to put on the top of the image, .e.g 'qa'.")
  .option('-b, --bottom [bottom]', "The label to put on the bottom of the image, .e.g '1.2.5'.")
  .action(async (parameters) => {
    const {
      input,
      output,
      top,
      bottom,
    } = parameters;

    await imageMagickCheck();

    await errorIfMissing(input, `Input file '${input}' does not exist.`);

    try {
      await labelImage(input, output, top, bottom);
    } catch (err) {
      console.error('An error occurred labelling the icon...');
      console.log(err);
      process.exit(1);
    }
  });

//  Define the 'init' command.
program
  .command('init')
  .description('Initialises app icons by creating simple icon templates')
  .option('-c, --caption [caption]', "An optional caption for the icon, e.g 'App'.")
  .option('--adaptive-icons [optional]', "Additionally, generate Android Adaptive Icon templates. Defaults to 'false'")
  .action(async (params) => {
    const { caption, adaptiveIcons } = params;

    await imageMagickCheck();

    //  Create the icon from the template, captioned if needed.
    const input = path.resolve(__dirname, '../src/init/icon.template.png');

    try {
      await init(input, './icon.png', { caption });
      console.log(`Created icon '${chalk.green('icon.png')}'`);

      if (adaptiveIcons) {
        const inputBackground = path.resolve(__dirname, '../src/init/icon.background.template.png');
        const inputForeground = path.resolve(__dirname, '../src/init/icon.foreground.template.png');
        await init(inputBackground, './icon.background.png');
        await init(inputForeground, './icon.foreground.png', { caption });
        console.log(`Created icon '${chalk.green('icon.background.png')}'`);
        console.log(`Created icon '${chalk.green('icon.foreground.png')}'`);
      }
    } catch (err) {
      console.error('An error occurred creating the icon...');
      console.log(err);
      return process.exit(1);
    }
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
