const { ipcRenderer } = require('electron');
const stopwatch = require('../js/stopwatch');
const data = require('../../data');

let imgs = ['../img/play-button.svg', '../img/stop-button.svg'];
let linkAbout = document.querySelector('#link-about');
let btnPlay = document.querySelector('.btn-play');
let time = document.querySelector('.time');
let course = document.querySelector('.course');
let btnAdd = document.querySelector('.btn-add');
let fildAdd = document.querySelector('.fild-add');

window.onload = () => {
    data.getData(course.textContent)
        .then((data) => {
            time.textContent = data.time;
        })
};

linkAbout.addEventListener('click', () => {
    ipcRenderer.send('open-window-about');
});

let play = false;
btnPlay.addEventListener('click', () => {
    if (play) {
        stopwatch.stop(course.textContent);
        new Notification('Stop', {
            body: `Você interrompeu o estudos de ${course.textContent}.`,
            icon: '../img/stop-button.png'
        })
        play = false;
    } else {
        stopwatch.start(time);
        new Notification('Play', {
            body: `Você iniciou o estudo de ${course.textContent}.`,
            icon: '../img/play-button.png'
        });
        play = true;
    }

    imgs = imgs.reverse();
    btnPlay.src = imgs[0];
});

ipcRenderer.on('change-course', (event, courseName) => {
    data.getData(courseName)
        .then((data) => {
            time.textContent = data.time;
        })
    course.textContent = courseName;
});

ipcRenderer.on('shortcut-play-stop', () => {
    let click = new MouseEvent('click');
    btnPlay.dispatchEvent(click);
});

btnAdd.addEventListener('click', () => {

    let newCourse = fildAdd.value;
    course.textContent = newCourse;
    time.textContent = '00:00:00';
    fildAdd.value = '';
    ipcRenderer.send('course-added', newCourse);
});