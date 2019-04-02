const beep = require('./beep');
const light = require('./light');

module.exports = function alerm(time = 0.1, isMorning = false, action) {
    if (isMorning) {
        light.on();
        light.init();
    }
    if (action) {
        light[action]();
    }

    beep(time);
}