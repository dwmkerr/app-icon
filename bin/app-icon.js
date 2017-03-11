#!/usr/bin/env node

// We use Node 4 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const program = require('commander');
const commandExists = require('command-exists');
const pack = require('../package.json');
const generate = require('../src/generate');
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
  .action(({ icon, search }) => {
    //  Check that we have imagemagick installed.
    commandExists('convert', (err, imageMagickInstalled) => {
      if (err) throw err;
      if (!imageMagickInstalled) {
        console.error('  Error: ImageMagick must be installed. Try:');
        console.error('    brew install imagemagick');
        return process.exit(1);
      }

      //  Check that we have a source icon.
      return fileExists(icon)
        .then((exists) => {
          if (!exists) {
            console.error(`Source file '${icon}' does not exist. Add the file or specify source icon with the '--icon' paramter.`);
            return process.exit(1);
          }
          //  Generate some icons then innit.
          return generate(icon, search)
            .catch((generateErr) => {
              console.error('An error occurred generating the icons...');
              console.log(generateErr);
              throw generateErr;
            });
        });
    });
  });

//  Extend the help with some examples.
program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ app-icon generate');
  console.log('    $ app-icon generate -i myicon.png -s ./app/cordova-app');
  console.log('');
});

//  Parse the arguments. If we have no subcommand, show the help.
program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
