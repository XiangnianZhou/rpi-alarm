const exec = require('child_process').exec;
const request = require('request');

// const xmlyAPI = 'http://m.ximalaya.com/mobile/v1/track/share/content?trackId=184619977&tpName=weixin&device=h5';
// 页面地址: http://m.ximalaya.com/toutiao/22689810/
const xmlyAPI =
    'http://m.ximalaya.com/m-revision/page/album/queryAlbumPage/12580759';

const playAudio = function(url) {
    return new Promise(resolve => {
        exec(`mplayer ${url}`, '', () => {
            resolve();
        });
    });
};

const getUrl = function getXmlyMediaUrl() {
    return new Promise((resolve, rejects) => {
        request.get(xmlyAPI, (error, response, body) => {
            try {
                const res = JSON.parse(body);
                if (!error && body && res.data) {
                    const newsInfoList =
                        res.data.typeSpecData.freeOrSingleAlbumData
                            .albumPageTrackRecords.trackDetailInfos;
                    const url = newsInfoList[0].trackInfo.playPath;
                    resolve(url);
                } else {
                    rejects('喜马拉雅数据错误');
                }
            } catch (e) {
                rejects(e);
            }
        });
    });
};

module.exports = function wether() {
    return getUrl().then(url => {
        return playAudio(url);
    });
};
