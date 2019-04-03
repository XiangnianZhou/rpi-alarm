// const alerm = require('./alerm/index');
const server = require('./server/index');

const update = function onUpdateSetting() {
    // 
}

server.start();
server.settingState.on('update', (res) => {
    console.log(res);
});
