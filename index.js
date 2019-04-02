const alerm = require('./alerm/index');
const server = require('./server/index');

server.start();
server.settingState.on('update', () => {
    console.log('an update event occurred!');
});
