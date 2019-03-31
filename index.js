// const beep = require('./beep');
// // beep(0.05)
// const light = require('./light');

const server = require('./server/index');

// light.off();
// setTimeout(() => {
//     light.init();
// }, 5000)
// light.init();


server.start();
server.settingState.on('update', () => {
    console.log('an update event occurred!');
});
