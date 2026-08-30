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
one folder per `version` in `package.json`:

```
release/0.3.0/
  VIDHI-0.3.0-arm64.dmg      VIDHI-0.3.0-x64.dmg        (macOS)
  VIDHI-0.3.0-arm64.zip      VIDHI-0.3.0-x64.zip
  VIDHI-0.3.0-x64.exe        (Windows: NSIS installer + portable)
  VIDHI-0.3.0-x86_64.AppImage (Linux)
```

Single-platform / faster variants:

```bash
npm run dist          # current OS only
npm run dist:mac      # .dmg + .zip  (arm64 + x64)
npm run dist:win      # NSIS installer + portable .exe
npm run dist:linux    # AppImage
npm run pack          # unpacked app dir only (no installer)
```

`electron-builder` copies `../dist` into the app as `Resources/dist`
(`extraResources` in `package.json`); `main.js` loads it from
`process.resourcesPath` when packaged and from `../dist` in dev.

### Cross-building notes

`npm run dist:all` works cleanly from one macOS host for **macOS + Linux**.
For the **Windows** installer you also need **Wine** (`brew install --cask wine-stable`),
otherwise skip it or build the Windows target on Windows / CI. For a
guaranteed all-OS build with zero host setup, run `dist:all` inside the
`electronuserland/builder` Docker image or a GitHub Actions matrix.

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
