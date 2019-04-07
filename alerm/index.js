// 硬件控制入口
const beep = require('./beep');
const light = require('./light');
const getBrighterState = require('./brighter');

module.exports = function alerm(time = 6, action, isInitLight = false) {
    const now = new Date().getHours;
    const isMorning = now > 4 && now < 12;
    const isSleeping = !!getBrighterState();

    if ((isMorning && isSleeping) || (!isMorning && !isSleeping)) {
        if (isInitLight) {
            light.on();
            light.init();
        }
        if (action) {
            light[action]();
        }

        beep(time);
    }
}
