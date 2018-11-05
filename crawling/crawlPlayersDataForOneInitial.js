const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const got = require('got');
const delay = require('delay');
const getPlayerData = require('./getPlayerData');

const baseUrl = 'http://npb.jp';

const frameForPlayerPageUrls = {
  players: {
    _s: 'a.player_unit_1',
    _d: [{
      name: 'dd.name',
      url: '_parent_ @ href',
    }],
  },
};

const crawlPlayersDataForOneInitial = async (url) => {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  jsonframe($);

  const playersData = [];
  const { players } = $('body').scrape(frameForPlayerPageUrls);
  for (let player of players) {
    console.log(`scraping ${player.name}...`);
    try {
      const url = `${baseUrl}${player.url}`;
      const playerData = await getPlayerData(url);
      playersData.push(playerData);
<<<<<<< HEAD:crawling/crawlPlayersDataForOneInitial.js
=======
      // console.log(playerData);
>>>>>>> 7c6938d1b0effbc72e005f29c0bab8d750363483:crawling/crawlPlayersDataForOneInitial.js
    } catch (err) {
      console.error(err);
    }
    await delay(500);
  }

  return playersData;
};

<<<<<<< HEAD:crawling/crawlPlayersDataForOneInitial.js
module.exports = crawlPlayersDataForOneInitial;
=======
module.exports = getPlayersDataForOneInitial;
>>>>>>> 7c6938d1b0effbc72e005f29c0bab8d750363483:crawling/crawlPlayersDataForOneInitial.js
