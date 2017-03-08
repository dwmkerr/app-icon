//  find.js
//
//  Find stuff in a file system. Pass a predicate which will
//  be given a fs.stat, e.g:
//
//  find('.', (stat) => stat.isDirectory());
//
//  Inspired by: http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

// We use Node 4 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const fs = require('fs');
const path = require('path');

function walk(dir, existingResults, predicate, done) {
  const results = existingResults;
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (pending === 0) return done(null, results);
    return list.forEach((file) => {
      const filePath = path.resolve(dir, file);
      fs.stat(filePath, (statErr, stat) => {
        if (predicate(filePath, stat)) results.push(filePath);
        if (stat && stat.isDirectory()) {
          walk(filePath, results, predicate, () => {
            pending -= 1;
            if (!pending) done(null, results);
          });
        } else {
          pending -= 1;
          if (!pending) done(null, results);
        }
      });
    });
  });
}

module.exports = function find(root, predicate) {
  return new Promise((resolve, reject) => {
    walk(root, [], predicate, (err, files) => {
      if (err) return reject(err);
      return resolve(files.map(f => path.relative('', f)));
    });
  });
};
