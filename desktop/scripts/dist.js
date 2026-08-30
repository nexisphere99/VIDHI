'use strict';

/*
 * Branch-aware electron-builder wrapper.
 *
 *   1. version   = the current git branch  (scripts/version.js)
 *   2. on macOS  = force-detach any leftover "VIDHI ..." DMG volumes first,
 *                  so electron-builder's `hdiutil detach` can't get wedged
 *                  ("unable to execute hdiutil ... Resource busy")
 *   3. build     = electron-builder with the branch version injected via
 *                  -c.extraMetadata.version  (package.json is NOT rewritten)
 *   4. prune     = strip release/<version>/ down to the 5 installers
 *
 * Usage:  node scripts/dist.js [--mac] [--linux] [--win] [--dir] ...
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = require('./version');
const targets = process.argv.slice(2);
const root = path.join(__dirname, '..');

/* 1 + 2 --------------------------------------------------------------- */
if (process.platform === 'darwin') {
  let vols = [];
  try {
    vols = fs.readdirSync('/Volumes').filter((v) => /^VIDHI\b/i.test(v));
  } catch (_) {
    /* ignore */
  }
  for (const v of vols) {
    try {
      execFileSync('hdiutil', ['detach', '-force', path.join('/Volumes', v)], {
        stdio: 'ignore',
      });
      console.log(`[dist] detached stale volume "/Volumes/${v}"`);
    } catch (_) {
      /* wasn't ours / already gone */
    }
  }
}

/* 3 ----------------------------------------------------------------- */
console.log(
  `[dist] building ${version}${targets.length ? '  ' + targets.join(' ') : '  (current OS)'}`
);

const builderCli = require.resolve('electron-builder/out/cli/cli.js');
execFileSync(
  process.execPath,
  [builderCli, ...targets, `-c.extraMetadata.version=${version}`],
  { stdio: 'inherit', cwd: root }
);

/* 4 ----------------------------------------------------------------- */
// `--dir` just produces an unpacked app for a smoke test   nothing to prune.
if (!targets.includes('--dir')) require('./prune-release');
