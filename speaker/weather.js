const puppeteer = require('puppeteer');
const exec = require('child_process').exec;

const xmlyPage = 'https://www.ximalaya.com/zhubo/7396493/';

const playAudio = (url) => {
  return new Promise(resolve => {
    exec(`mplayer ${url}`, '', () => [
      resolve()
    ]);
  });
}

const getWeather = async () => {

  const sleep = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(xmlyPage);
  await page.waitForSelector('.black-tape._LmmS');
  await page.click('.black-tape._LmmS');
  
  const getWeatherInfo = async() => {
    await sleep(3000);
    const list = page.evaluate(() => {
      let playListStr = localStorage.getItem('player_playlist') || '';
      let playList;
      try {
        playList = JSON.parse(playListStr);
      } catch(e) {
        playList = [];
      }
      return playList;
    });
    return list;
  }

  let weatheList = await getWeatherInfo();

  if (weatheList.length === 0) {
    weatheList = getWeatherInfo(); // 再试一次
  }
  await browser.close();

  if (weatheList[0] && weatheList[0].src) {
    console.log(weatheList[0].src)
    await playAudio(weatheList[0].src);
  }
}

module.exports = getWeather;
