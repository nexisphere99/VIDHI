# VIDHI   desktop build (Electron)

A thin Electron shell around the **already-compiled** game. It loads
`../dist/index.html` and `../dist/images/` and nothing else   the Twine
sources (`game/`, `build.sh`, `tools/`) are never touched by this folder.

```
desktop/
  main.js        the Electron main process (window, menu, external links)
  package.json   app manifest + electron-builder config
  build/         optional: put icons here (icon.icns / icon.ico / icon.png)
  release/       build output (gitignored)
```

## Prerequisites

1. **Compile the game first**, from the repo root:
   ```bash
   ./build.sh          # -> dist/index.html  (+ dist/images/)
   ```
   `dist/` is gitignored, so it must exist on disk before packaging. The
   desktop app only ever ships whatever `./build.sh` produced.

2. Install the desktop toolchain (once):
   ```bash
   cd desktop
   npm install
   ```

## Run it (dev)

```bash
cd desktop
npm start
```

Loads `../dist/index.html` directly. Re-run `./build.sh` and hit
**Game -> Reload** (Cmd/Ctrl-R) to pick up story changes.

## Package installers

**All three platforms in one go**, into a version folder:

```bash
cd desktop
npm run dist:all      # -> desktop/release/<version>/
```

or, to recompile the Twine game first and then build everything:

```bash
cd desktop
npm run release       # runs ../build.sh, then dist:all
```

### Version = the git branch you're on

`dist*` builds go through `scripts/dist.js`, which sets the version from the
**current git branch**, not from `package.json`:

| branch | version | output folder |
|--------|---------|---------------|
| `0.1`  | `0.1.0` | `release/0.1.0/` |
| `0.2`  | `0.2.0` | `release/0.2.0/` |
| `0.3`  | `0.3.0` | `release/0.3.0/` |

So `git checkout 0.1 && npm run dist:all` builds `0.1.0`   you never have to
remember to bump `package.json`. (`npm run version` prints what it resolved;
on a non-`x.y` branch it falls back to the `package.json` number.)

### The files you actually ship

`scripts/dist.js` also runs `prune-release.js` at the end, which deletes
everything from `release/<version>/` that isn't a shippable installer   the
`*.blockmap` auto-update deltas, the `latest*.yml` update manifests, the
`builder-*.y*ml` build logs, and the `*-unpacked/` / `mac*/` intermediate app
bundles. What's left is exactly the release set:

| file | platform |
|------|----------|
| `VIDHI-<v>-mac-arm64.dmg`        | macOS, Apple Silicon |
| `VIDHI-<v>-mac-x64.dmg`          | macOS, Intel |
| `VIDHI-<v>-win-x64-setup.exe`    | Windows installer |
| `VIDHI-<v>-linux-x86_64.AppImage`| Linux, x86-64 |
| `VIDHI-<v>-linux-arm64.AppImage` | Linux, ARM |

Run `npm run prune` by hand any time to clean an existing folder.

Single-platform / faster variants:

```bash
npm run dist          # current OS only
npm run dist:mac      # both .dmg
npm run dist:win      # NSIS .exe   (needs Wine, see below)
npm run dist:linux    # both .AppImage
npm run pack          # unpacked app dir only (no installer)
```

`electron-builder` copies `../dist` into the app as `Resources/dist`
(`extraResources` in `package.json`); `main.js` loads it from
`process.resourcesPath` when packaged and from `../dist` in dev.

### Cross-building notes

`npm run dist:all` from a macOS host builds **macOS + Linux** cleanly.
The **Windows** installer additionally needs **Wine**:

```bash
brew install --cask wine-stable
```

Without it, the Windows step half-runs and leaves a stray `*.nsis.7z` (not a
usable installer)   `dist:all` won't error, you just get no `.exe` (prune
clears the `.nsis.7z` too). Build the Windows target on Windows, or run
`dist:all` inside the `electronuserland/builder` Docker image / a GitHub
Actions OS matrix for a zero-setup all-platform build.

**`unable to execute hdiutil ... detach ... Resource busy`:** a DMG volume
from a previous build is still mounted. `scripts/dist.js` force-detaches any
`/Volumes/VIDHI *` before building, and the two `.dmg`s now get per-arch
volume titles so arm64 and x64 can't collide. If it still happens, run
`hdiutil detach -force "/Volumes/VIDHI 0.1.0 arm64"` (or whatever `mount`
shows) and rebuild.

### Code signing

The macOS `.dmg`s are **unsigned** (no Apple Developer ID). Users will hit
Gatekeeper ("VIDHI is damaged / can't be opened")   they clear it with
right-click -> Open once, or:

```bash
xattr -cr /Applications/VIDHI.app
```

Proper signing + notarization needs a paid Apple Developer account; add the
identity to `mac.identity` / an `afterSign` notarize hook when you have one.
Windows `.exe` is likewise unsigned (SmartScreen warning on first run).

## Icons (optional)

Drop these into `desktop/build/` and electron-builder picks them up
automatically:

| file             | platform |
|------------------|----------|
| `icon.icns`      | macOS    |
| `icon.ico`       | Windows  |
| `icon.png` (512+)| Linux    |

Without them the default Electron icon is used.

## Notes

- **Saves** use the browser `localStorage` inside the app's own profile
  (`app.getPath('userData')`), so they persist and are private to the
  desktop build   separate from any browser copy of the game.
- **Fonts:** the game's CSS `@import`s Google Fonts. Online they load;
  offline the CSS fallback stack is used. Bundling the fonts would mean
  editing the game CSS, which this wrapper deliberately does not do.
- **The Patreon link** (and any other `http(s)` link) opens in the user's
  default browser, not inside the app window.
- Window size / position / maximized / fullscreen are remembered between
  launches (`window-state.json` in the app profile).

## Version

`dist*` derive the version from the git branch (see above)   nothing to bump.
The `version` in `desktop/package.json` is only a fallback for builds off a
branch that isn't named `x.y` / `x.y.z`; keep it roughly in sync with the
branch anyway so `npm start` / the in-app "About" show a sane number.
