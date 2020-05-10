const moment = require('moment');

let seconds;
let idInterval;

module.exports = {

    start(element) {

        clearInterval(idInterval);
        
        let time = moment.duration(element.textContent);
        seconds = time.asSeconds();
        let self = this;

         // aqui eu posso utilizar uma rrow function para que o scopo
         // do deste this fique disponivel dentro da função setInterval
        idInterval = setInterval(function () {
            seconds++;
            element.textContent = self.secondsToTime(seconds);
        }, 1000);
    },stop() {
        clearInterval(idInterval); 

    },secondsToTime(seconds) {
        return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
    }
};  