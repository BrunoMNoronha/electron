const { ipcRenderer } = require('electron');
const stopwatch = require('../js/stopwatch');
const data = require('../../data')

let imgs = ['../img/play-button.svg','../img/stop-button.svg'];
let linkAbout = document.querySelector('#link-about');
let btnPlay = document.querySelector('.btn-play');
let time = document.querySelector('.time');
let course = document.querySelector('.course');

window.onload = () => {
    data.getData(course.textContent)
    .then((data) => {
        time.textContent = data.time;
        console.log(data);
    })
};

linkAbout.addEventListener('click', function() {
    ipcRenderer.send('open-window-about');
});

let play = false;
btnPlay.addEventListener('click', function() {
    if (play) {
        stopwatch.stop(course.textContent);
        play = false;
    } else {
        stopwatch.start(time);
        play = true;
    }

    imgs = imgs.reverse();
    btnPlay.src = imgs[0];
});