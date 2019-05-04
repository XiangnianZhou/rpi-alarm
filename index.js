const alerm = require('./alerm/index');
const server = require('./server/index');
const speaker = require('./speaker/index');

const dayjs = require('dayjs');

let setting = {};

const mainTimer = function () {
    setTimeout(() => {
        if (!setting.isOpen) {
            mainTimer();
            return;
        }
        const hour = dayjs().hour();

        const isOverMinutes = function (minutes = 0) {
            let today;
            if (hour < 4) {
                // 早上4点前，认为是前一天的晚上
                today = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
            } else {
                today = dayjs().format('YYYY-MM-DD');
            }
            const setingTime = {
                morning: dayjs(`${today} ${setting.morning}`),
                night: dayjs(`${today} ${setting.night}`)
            }

            const isMorningOver = dayjs().second(0).unix() === setingTime.morning.add(minutes, 'minute').second(0).unix();
            const isNightOver = dayjs().second(0).unix() === setingTime.night.add(minutes, 'minute').second(0).unix();
            return isMorningOver || isNightOver;
        };

        if (isOverMinutes(0)) {
            alerm(5, '', hour < 12);
            // 早晚第一次闹铃后要播放天气预报
            speaker.wether();
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(15)) {
            alerm(10, 'up');  // 晚上不亮灯，up无效
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(30)) {
            alerm(20, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(40)) {
            alerm(30, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(50)) {
            alerm(30, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(60)) {
            alerm(30, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(70)) {
            alerm(40, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(80)) {
            alerm(50, 'up');
            setTimeout(mainTimer, 60000);
        } else if (isOverMinutes(90)) {
            alerm(60, false, hour < 12 && hour > 4 ? 'off' : '');
            setTimeout(mainTimer, 60000);
        } else {
            mainTimer();
        }
    }, 1500);
};

const update = function onUpdateSetting({ isOpen = false, morning = '', night = '' } = res) {
    setting = {
        isOpen,
        morning,
        night
    }
    console.log('update setting:', setting);
};

server.settingState.on('update', (res) => {
    update(res);
});
server.start();

// fire
mainTimer();
