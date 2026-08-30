'use strict';

/*
 * Post-build cleanup.
 *
 * electron-builder drops a pile of auto-update / debug files and intermediate
 * app directories next to the actual installers. This deletes everything in
 * release/<version>/ that isn't a shippable installer, leaving only:
 *
 *   VIDHI-<v>-mac-arm64.dmg
 *   VIDHI-<v>-mac-x64.dmg
 *   VIDHI-<v>-win-x64-setup.exe
 *   VIDHI-<v>-linux-x64.AppImage
 *   VIDHI-<v>-linux-arm64.AppImage
 *
 * Run automatically after every `npm run dist*`; safe to run by hand too.
 */

const fs = require('fs');
const path = require('path');

const version = require('./version');
const dir = path.join(__dirname, '..', 'release', version);

if (!fs.existsSync(dir)) {
  console.log(`[prune] nothing to do   ${dir} does not exist`);
  process.exit(0);
}

// the only things worth keeping
const KEEP = /(\.dmg|\.AppImage|-setup\.exe)$/;

let removed = 0;
for (const name of fs.readdirSync(dir)) {
  if (KEEP.test(name)) continue;
  const full = path.join(dir, name);
  fs.rmSync(full, { recursive: true, force: true });
  console.log(`[prune] removed ${name}`);
  removed++;
}

const kept = fs.readdirSync(dir).sort();
console.log(
  `\n[prune] ${removed} item(s) removed. Release files in release/${version}/:`
);
for (const name of kept) console.log(`  ${name}`);
