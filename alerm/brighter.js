// guang min dianzu qudong joaben 
const Gpio = require('onoff').Gpio;
const inputGpio = new Gpio(27, 'in');

module.exports = inputGpio.readSync;
