const { app, BrowserWindow } = require('electron');

app.on('ready', function() {

    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/src/windows/main.html`);
});

app.on('window-all-closed', function() {
    app.quit();
});