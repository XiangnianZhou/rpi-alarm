const Gpio = require('onoff').Gpio;
const beep = new Gpio(22, 'out');
const lightInput = new Gpio(27, 'in');

const beepOn  = () => {
    beep.writeSync(1);
    setTimeout(() => {
        beep.writeSync(0);
    }, 350);
}

console.log(lightInput.readSync())