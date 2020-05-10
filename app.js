const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow = null;
app.on('ready', function() {

    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/src/windows/main.html`);
});

let aboutWindow = null;
ipcMain.on('open-window-about', function() {

    if (!aboutWindow) {
        aboutWindow = new BrowserWindow({
            parent: mainWindow,
            autoHideMenuBar: true,
            width: 200,
            height: 280,
            maximizable: false,
            minimizable: false,
            resizable: false
        });

        aboutWindow.on('close', function() {
            aboutWindow = null;
        });
    };

    aboutWindow.loadURL(`file://${__dirname}/src/windows/about.html`);
});

ipcMain.on('close-window-about', function() {
    aboutWindow.close();
});

app.on('window-all-closed', function() {
    app.quit();
});