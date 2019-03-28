const exec = require('child_process').exec;

const init =  function OpenAndInitLightness()  {
    exec('sudo irsend SEND_ONCE light on' );
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            exec('sudo irsend SEND_ONCE light linght-down');
        }, i * 500);
    }
};

const up = function LightnessUp() {
    exec('sudo irsend SEND_ONCE light linght-up' );
}

const down = function LightnessDown() {
    exec('sudo irsend SEND_ONCE light linght-down' );
}

const on = function onAndOff() {
    exec('sudo irsend SEND_ONCE light on' );
}

const off = on;

module.exports = {
    off,
    on,
    up,
    down,
    init
}
