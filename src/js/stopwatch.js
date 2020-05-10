const { ipcRenderer } = require('electron');
const moment = require('moment');

let idInterval;
let seconds;
let time;

module.exports = {
    start(element) {
        time = moment.duration(element.textContent);
        seconds = time.asSeconds();
        clearInterval(idInterval);
        idInterval = setInterval(() => {
            seconds++;
            element.textContent = this.secondsToTime(seconds);
        }, 1000);

    }, stop(course) {
        clearInterval(idInterval);
        studyDuration = this.secondsToTime(seconds);
        ipcRenderer.send('stop-course', course, studyDuration);

    }, secondsToTime(seconds) {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }
};  