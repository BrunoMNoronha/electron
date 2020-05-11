const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;
let mainWindow = null;

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });

    tray = new Tray('./src/img/icon.png');
    let template = templateGenerator.generateTemplateTray(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    let templateMenu = templateGenerator.generateTemplateMenu(app);
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadURL(`file://${__dirname}/src/windows/main.html`);
});

let aboutWindow = null;
ipcMain.on('open-window-about', () => {

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

        aboutWindow.on('close', () => {
            aboutWindow = null;
        });
    };

    aboutWindow.loadURL(`file://${__dirname}/src/windows/about.html`);
});

ipcMain.on('close-window-about', function () {
    aboutWindow.close();
});

ipcMain.on('stop-course',  (event, course, studyDuration) => {
    console.log(`O curso ${course} foi estudado por ${studyDuration}`);
    data.store(course, studyDuration);
});

ipcMain.on('course-added', (event, newCourse) => {
    let newTemplate = templateGenerator.addCourseTray(newCourse, mainWindow);
    let newTrayMenu = Menu.buildFromTemplate(newTemplate);
    tray.setContextMenu(newTrayMenu);
    
})

app.on('window-all-closed', function () {
    app.quit();
});