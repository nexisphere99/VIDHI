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

Everything lands in **`desktop/release/<version>/`** (e.g. `release/0.3.0/`),
one folder per `version` in `package.json`.

### The files you actually ship

| file | platform |
|------|----------|
| `VIDHI-<v>-mac-arm64.dmg`     | macOS, Apple Silicon |
| `VIDHI-<v>-mac-x64.dmg`       | macOS, Intel |
| `VIDHI-<v>-win-x64-setup.exe` | Windows installer |
| `VIDHI-<v>-linux-x64.AppImage`| Linux, x86-64 |
| `VIDHI-<v>-linux-arm64.AppImage`| Linux, ARM |

**Ignore everything else** in the folder   `*.blockmap` (auto-update deltas),
`builder-effective-config.yaml` (a build log), and the `*-unpacked/` /
`mac*/` directories (intermediate app bundles). None of those are release
artifacts.

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
usable installer)   `dist:all` won't error, you just get no `.exe`. Build
the Windows target on Windows, or run `dist:all` inside the
`electronuserland/builder` Docker image / a GitHub Actions OS matrix for a
zero-setup all-platform build.

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

Bump `version` in `desktop/package.json` to match the release
(`0.1` / `0.2` / `0.3` branch). It drives the installer filenames and the
in-app "About" version.
