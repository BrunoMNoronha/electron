const { ipcRenderer } = require('electron');

let linkAbout = document.querySelector('#link-about');
linkAbout.addEventListener('click', function() {
    ipcRenderer.send('open-window-about');
});