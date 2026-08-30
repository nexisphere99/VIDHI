'use strict';

/*
 * VIDHI   desktop shell.
 *
 * This is a thin Electron wrapper around the already-built Twine/SugarCube
 * game. It never touches the Twine sources (game/, build.sh, tools/): it just
 * loads dist/index.html and its dist/images/ folder.
 *
 *   dev  (npm start)      -> loads  <repo>/dist/index.html
 *   packaged             -> loads  <app>/Contents/Resources/dist/index.html
 *                            (dist/ is copied in via electron-builder
 *                             "extraResources" in package.json)
 */

const { app, BrowserWindow, Menu, shell, dialog, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;

const GAME_INDEX = isDev
  ? path.join(__dirname, '..', 'dist', 'index.html')
  : path.join(process.resourcesPath, 'dist', 'index.html');

/* ------------------------------------------------------------------ *
 *  window bounds persistence   no extra dependency, just a JSON file  *
 * ------------------------------------------------------------------ */
const stateFile = path.join(app.getPath('userData'), 'window-state.json');

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(stateFile, 'utf8')) || {};
  } catch (_) {
    return {};
  }
}

function saveState(win) {
  if (!win || win.isDestroyed()) return;
  if (win.isFullScreen()) return; // don't clobber saved bounds with fullscreen state
  const b = win.getNormalBounds();
  try {
    fs.writeFileSync(
      stateFile,
      JSON.stringify({
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        maximized: win.isMaximized(),
      })
    );
  } catch (_) {
    /* non-fatal */
  }
}

/* ------------------------------------------------------------------ */

let mainWindow = null;

function openExternal(url) {
  if (/^https?:\/\//i.test(url)) shell.openExternal(url);
}

function createWindow() {
  const saved = loadState();
  const area = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: saved.width || Math.min(1180, area.width),
    height: saved.height || Math.min(860, area.height),
    x: saved.x,
    y: saved.y,
    minWidth: 720,
    minHeight: 560,
    title: 'VIDHI',
    backgroundColor: '#140d0a',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      // the game is a single self-contained document; nothing to preload
    },
  });

  if (saved.maximized) mainWindow.maximize();

  mainWindow.loadFile(GAME_INDEX);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // http/https links (e.g. the Patreon button) go to the OS browser,
  // never a chrome-less Electron window.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternal(url);
    return { action: 'deny' };
  });

  // the game is an SPA   it should never actually navigate. If something
  // tries, block it (and bounce real URLs to the browser).
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      openExternal(url);
    }
  });

  mainWindow.webContents.on('did-fail-load', (_e, code, desc, validatedURL) => {
    if (code === -3) return; // aborted (harmless, e.g. an external nav we denied)
    dialog.showErrorBox(
      'VIDHI   failed to load',
      `${desc} (${code})\n${validatedURL}`
    );
  });

  ['resize', 'move', 'close'].forEach((ev) =>
    mainWindow.on(ev, () => saveState(mainWindow))
  );
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/* ------------------------------------------------------------------ *
 *  menu                                                              *
 * ------------------------------------------------------------------ */
function buildMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'Game',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow && mainWindow.webContents.reload(),
        },
        {
          label: 'Reopen from Title',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => mainWindow && mainWindow.loadFile(GAME_INDEX),
        },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        {
          label: 'Toggle Developer Tools',
          accelerator: isMac ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          click: () => mainWindow && mainWindow.webContents.toggleDevTools(),
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'minimize' },
        ...(isMac ? [{ role: 'zoom' }, { role: 'front' }] : []),
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Support VIDHI on Patreon',
          click: () => shell.openExternal('https://www.patreon.com/c/vidhidevs'),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/* ------------------------------------------------------------------ *
 *  lifecycle                                                         *
 * ------------------------------------------------------------------ */
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    if (!fs.existsSync(GAME_INDEX)) {
      dialog.showErrorBox(
        'VIDHI   compiled game not found',
        `Expected:\n${GAME_INDEX}\n\n` +
          (isDev
            ? 'Run  ./build.sh  from the repo root, then  npm start  again.'
            : 'This package looks incomplete   dist/ was not bundled.')
      );
      app.quit();
      return;
    }

    buildMenu();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
