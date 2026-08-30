'use strict';

/*
 * Resolve the release version from the CURRENT GIT BRANCH.
 *
 *   branch  0.1 / 0.2 / 0.3   ->  0.1.0 / 0.2.0 / 0.3.0
 *   branch  1.4.2  (x.y.z)    ->  1.4.2
 *   anything else             ->  the "version" in package.json
 *
 * This is what makes `npm run dist*` build the branch you're actually on,
 * instead of whatever number happens to be hard-coded in package.json.
 */

const { execFileSync } = require('child_process');

function fromGit() {
  try {
    const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: __dirname,
      encoding: 'utf8',
    }).trim();
    if (/^\d+\.\d+$/.test(branch)) return branch + '.0';
    if (/^\d+\.\d+\.\d+$/.test(branch)) return branch;
  } catch (_) {
    /* not a git checkout, or git missing */
  }
  return null;
}

const version = fromGit() || require('../package.json').version;

module.exports = version;

if (require.main === module) process.stdout.write(version);
