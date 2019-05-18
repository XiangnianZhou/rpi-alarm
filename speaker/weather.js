const exec = require('child_process').exec;
const request = require('request');

const xmlyAPI = 'http://m.ximalaya.com/mobile/v1/track/share/content?trackId=184619977&tpName=weixin&device=h5';

const playAudio = function (url) {
  return new Promise(resolve => {
    exec(`mplayer ${url}`, '', () => {
      resolve();
    });
  });
}

const getUrl = function getXmlyMediaUrl() {
  return new Promise((resolve, rejects) => {
    request.get(xmlyAPI, (error, response, body) => {
      try {
        const res = JSON.parse(body);
        if (!error && body && res.audioUrl) {
          const url = res.audioUrl;
          resolve(url);
        } else {
          rejects('喜马拉雅数据错误');
        }
      } catch(e) {
        rejects(e);
      }
    });
  });
}

module.exports = function  wether () {
  return getUrl().then(url => {
    playAudio(url);
  });
}