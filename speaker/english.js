const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const startDay = new Date('2019/11/06').getTime();

function getMediaFile() {
    const now = Date.now();
    let days = Math.floor((now - startDay) / (24 * 60 * 60 * 1000));
    let media;
    while (!media) {
        let mediaPath = path.resolve(
            __dirname,
            '../../',
            'nce/media',
            `${days}.mp3`
        );
        if (fs.existsSync(mediaPath)) {
            media = mediaPath;
        } else {
            days--;
        }
    }

    return media;
}

module.exports = function english() {
    let file = getMediaFile();
    return new Promise(resolve => {
        exec(`mplayer ${file}`, '', () => {
            resolve();
        });
    });
};
