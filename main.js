const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
let win;

const dispatch = (data) => {
  win.webContents.send("message", data);
};

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  console.log(`file://${__dirname}/dist/index.html`);
  // Load index.html
  win.loadFile(`${__dirname}/dist/index.html`);
}

app.on("ready", () => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify();

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("version", app.getVersion());
  });
});

autoUpdater.on("checking-for-update", () => {
  console.log("prova");
  dispatch("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  dispatch("Update available.");
});

autoUpdater.on("update-not-available", (info) => {
  dispatch("Update not available.");
});

autoUpdater.on("error", (err) => {
  dispatch("Error in auto-updater. " + err);
});

autoUpdater.on("download-progress", (progressObj) => {
  win.webContents.send("download-progress", progressObj.percent);
});

autoUpdater.on("update-downloaded", (info) => {
  dispatch("Update downloaded");
});
