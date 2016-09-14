#!/usr/bin/env node

'use strict';

const program = require('commander');
const commandExists = require('command-exists');
const fs = require('fs');
const generate = require('./generate');

program
  .version(require('./package.json').version)
  .option('-i, --icon [optional]', "The icon to use. Defaults to 'icon.png'")
  .option('-s, --search [optional]', "The folder to search from. Defaults to './'")
  .parse(process.argv);

//  Get our parameters.
const sourceIcon = program.icon || "icon.png";
const searchRoot = program.search || "./";

//  Check that we have imagemagick installed.
commandExists('convert', (err, imageMagickInstalled) => {
  if(err) throw err;
  if(!imageMagickInstalled) {
    console.error("ImageMagick must be installed. Please check the docs.");
    return process.exit(1);
  }

  //  Check that we have a source icon.
  fs.stat(sourceIcon, (err) => {
    if(err && err.code === 'ENOENT') {
      console.error(`Source file '${sourceIcon}' does not exist. Add the file or specify source icon with the '--icon' paramter.`);
      return process.exit(1);
    }

    //  Generate some icons then innit.
    generate.generate(searchRoot, sourceIcon)
      .then((results) => {
      })
      .catch(err => {
        console.error("An error occurred generating the icons...");
        console.log(err);
        throw err;
      });
  });
});
