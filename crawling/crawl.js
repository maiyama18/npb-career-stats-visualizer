const got = require('got');
const delay = require('delay');
const scrapeTopPage = require('./scrape/scrapeTopPage');
const scrapeIndexPage = require('./scrape/scrapeIndexPage');
const scrapePlayerPage = require('./scrape/scrapePlayerPage');
const cleansePlayersData = require('./cleanse/cleansePlayerData');
const uploadStatsToFirestore = require('./upload/uploadStatsToFirestore');
const uploadProfileToAlgolia = require('./upload/uploadProfileToAlgolia');

const crawl = async (topUrl) => {
  const topResponse = await got(topUrl);
  const indexUrls = scrapeTopPage(topResponse.body, topUrl);

  for (let indexUrl of indexUrls) {
    const indexResponse = await got(indexUrl);
    const playerUrls = scrapeIndexPage(indexResponse.body);

    for (let playerUrl of playerUrls) {
      try {
        console.log(playerUrl);
        const playerResponse = await got(playerUrl);
        const playerData = scrapePlayerPage(playerResponse.body);
        if (noStats(playerData)) {
          console.error(`skip ${playerUrl} because there is no stats.`);
          continue;
        }
        if (tooOld(playerData)) {
          console.error(`skip ${playerUrl} because the record is too old.`);
          continue;
        }

        const cleansedPlayerData = cleansePlayersData(playerData, playerUrl);
        await uploadProfileToAlgolia(cleansedPlayerData);
        await uploadStatsToFirestore(cleansedPlayerData);
        await delay(500);
      } catch (err) {
        console.error(`skip ${playerUrl} because unknown error occurs`);
      }
    }
  }
};

const tooOld = (playerData) => {
  return parseInt(playerData.battingStats[0].year) <= 1955;
};
const noStats = (playerData) => {
  return !playerData.battingStats[0];
};

module.exports = crawl;