const childProcess = require('child_process');

//  Simple function which calls an process (likely to be imagemagic) and
//  resolves with:
//  { stdout, stderr }
//  or if an error or non-zero result occurs, rejects with:
//  { err, stdout, stderr }
module.exports = function callImagemagick(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Failed to call '${command}. Error is '${err.message}'.`);
        //  TODO: bad practic to reject a non Error object, revisit this.
        //  eslint-disable-next-line prefer-promise-reject-errors
        return reject({ err, stdout, stderr });
      }

      return resolve({ stdout, stderr });
    });
  });
};
