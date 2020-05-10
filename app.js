const { app, Tray, BrowserWindow, ipcMain } = require('electron');
const data = require('./data');

let tray = null;
let mainWindow = null;

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray('./src/img/icon.png');

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

ipcMain.on('stop-course', function(event, course, studyDuration) {
    console.log(`O curso ${course} foi estudado por ${studyDuration}`);
    data.store(course, studyDuration);
});

app.on('window-all-closed', function() {
    app.quit();
});