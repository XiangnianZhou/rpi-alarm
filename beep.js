const Gpio = require('onoff').Gpio;
const beepGpio = new Gpio(22, 'out');

function  beepOn(minutes) {
    const ms = minutes * 60 * 1000;
    let value = 1;
    const beep= () => beepGpio.writeSync(1);
    const space = () => beepGpio.writeSync(0);

    const beepUnit = ()  => {
        beep();
        setTimeout(space, 150);
        setTimeout(beep, 180);
        setTimeout(space, 320);
        setTimeout(beep, 350);
        setTimeout(space, 480);
    };

    beepUnit();
    const beepTimer = setInterval(beepUnit, 1000);
    setTimeout(() => {
        clearInterval(beepTimer);
        space();
    }, ms);
}

module.exports = beepOn;
