import path from "path";
import url from "url";
import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { runServer } from "./server";

// Runs the server resposible for the interaction with the database
runServer();

let win: BrowserWindow;

// Helper function to send data to the renderer script
const dispatch = (data) => {
  win.webContents.send("message", data);
};

// Gets the production value from the .env
const production: boolean =
  (process.env.NODE_ENV || "production") === "production";
if (!production) {
  require("electron-reload")(__dirname);
}

// Launches the main native window
function launch() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Loads the frontend
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // When the window is closed the win process gets deleted
  win.on("closed", function () {
    win = null;
  });
}

// Mac stuff I'd rather not know about
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Mac stuff I'd rather not know about chapter 2
app.on("activate", function () {
  if (win === null) {
    launch();
  }
});

app.on("ready", () => {
  launch();

  // When the app is ready it checks for updates
  autoUpdater.checkForUpdatesAndNotify();

  // Sends the version number to the frontend [Not used ATM]
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("version", app.getVersion());
  });
});

// Start of update related stuff
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
// End of update related stuff