// 硬件控制入口
const beep = require('./beep');
const light = require('./light');

module.exports = function alerm(time = 6, action, isInitLight = false) {
    if (isInitLight) {
        light.on();
        light.init();
    }
    if (action) {
        light[action]();
    }

    beep(time);
}