const beep = require('./beep');
// beep(0.05)
const light = require('./light');

light.off();
setTimeout(() => {
    light.init();
}, 5000)
// light.init();
