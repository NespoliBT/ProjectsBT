import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
require("./server");

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
