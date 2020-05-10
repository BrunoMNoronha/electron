const { ipcRenderer, shell } = require('electron');
const process = require('process');

let nodeVersion = document.querySelector('#node-version');
let electronVersion = document.querySelector('#electron-version');
let chromiumVersion = document.querySelector('#chromium-version');

window.onload = function() {
nodeVersion.textContent = process.version;
electronVersion.textContent = process.versions.electron;
chromiumVersion.textContent = process.versions.chrome.substr(0,4);
};

let linkClose = document.querySelector('#link-close');
linkClose.addEventListener('click', function() {
    ipcRenderer.send('close-window-about');
});

let linkGithub = document.querySelector('#link-github');
linkGithub.addEventListener('click', function () {
    shell.openExternal('https://github.com/brunomnoronha/electron');
});