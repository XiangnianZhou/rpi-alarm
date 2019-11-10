// 获取光敏电阻模块状态
const Gpio = require('onoff').Gpio;
const inputGpio = new Gpio(27, 'in');

module.exports = () => inputGpio.readSync();
