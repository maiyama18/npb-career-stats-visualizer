const got = require('got');
const delay = require('delay');
const scrapeTopPage = require('./scrapeTopPage');
const scrapeIndexPage = require('./scrapeIndexPage');
const scrapePlayerPage = require('./scrapePlayerPage');
const cleansePlayersData = require('./cleansePlayerData');
const uploadPlayerData = require('./uploadPlayerData');

const crawl = async (db, topUrl) => {
  const topResponse = await got(topUrl);
  const indexUrls = scrapeTopPage(topResponse.body, topUrl);

  for (let indexUrl of indexUrls) {
    const indexResponse = await got(indexUrl);
    const playerUrls = scrapeIndexPage(indexResponse.body);

    for (let playerUrl of playerUrls) {
      const playerResponse = await got(playerUrl);
      const playerData = scrapePlayerPage(playerResponse.body);
      const cleansedPlayerData = cleansePlayersData(playerData, playerUrl);
      await uploadPlayerData(db, cleansedPlayerData);
      await delay(500);
    }
  }
};

module.exports = crawl;