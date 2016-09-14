//  find.js
//
//  Find stuff in a file system. Pass a predicate which will
//  be given a fs.stat, e.g:
//
//  find('.', (stat) => stat.isDirectory());
//
//  Inspired by: http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

const fs = require('fs');
const path = require('path');

function walk(dir, existingResults, predicate, done) {
  const results = existingResults || [];
  fs.readdir(dir, (err, list) => {
    var pending = list.length;
    if (err || pending === 0) return done(err, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (predicate(file, stat)) results.push(file); 
        if (stat && stat.isDirectory()) {
          walk(file, results, predicate, (err, res) => {
            if (!--pending) done(null, results);
          });
        } else {
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

module.exports = function find(root, predicate) {
  return new Promise((resolve, reject) => {
    walk(root, [], predicate, (err, files) => {
      if(err) return reject(err);
      return resolve(files.map(f => path.relative('', f)));
    });
  });
};
