const { expect } = require('chai');
const mkdirp = require('mkdirp');
const path = require('path');
const find = require('./find');

describe('find', () => {
  it('should be able to find a file', async () => {
    const results = await find(path.normalize('./src'), (file, stat) => {
      return file.match(/find.js$/) && !stat.isDirectory();
    });
    expect(results.length).to.equal(1);
    expect(results[0]).to.match(/find.js$/);
  });

  it('should be able to find a folder', async () => {
    //  Build the regexp for src/utils, cross platform.
    const folder = path.normalize('src/utils').replace(/\\/g, '\\\\');
    const rex = new RegExp(`${folder}$`);

    const results = await find(path.normalize('./src'), (file, stat) => {
      return file.match(rex) && stat.isDirectory();
    });
    expect(results.length).to.equal(1);
    expect(results[0]).to.match(rex);
  });

  it('should reject if an invalid search root is passed', async () => {
    //  TODO: A potential improvement here might be to use chai-as-promised
    //  and explicitly expect a rejection. Otherwise, if the function
    //  succeeds (by mistake), we won't see it as an explicit failure.
    try {
      await find(path.normalize('./invalid'));
    } catch (err) {
      expect(err.message).to.match(/no such file or directory/);
    }
  });

  it('should return an empty resultset for empty directories', async () => {
    //  TODO: The find function has a different codepath for empty folders.
    //  Better would be a more functional pattern, then iterating through a
    //  fileset works with same whether or not it is empty.

    //  Ensure we have an empty directory first!
    mkdirp.sync(path.normalize('./src/utils/empty'));
    const results = await find(path.normalize('./src/utils/empty'));
    expect(results.length).to.equal(0);
  });
});
