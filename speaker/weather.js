const exec = require('child_process').exec;
const request = require('request');

const xmlyAPI = 'https://www.ximalaya.com/revision/play/album?albumId=22689810&pageNum=1&sort=-1&pageSize=1';

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
      console.log(body)
      try {
        const res = JSON.parse(body);
        if (!error && body && res.data && res.data.tracksAudioPlay) {
          const url = res.data.tracksAudioPlay[0].src;
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
  getUrl().then(url => {
    playAudio(url);
  }).catch(e => {
    // wether();
  }) ;
}
