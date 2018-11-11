const got = require('got');
const delay = require('delay');
const scrapePlayerPage = require('./scrape/scrapePlayerPage');
const cleansePlayersData = require('./cleanse/cleansePlayerData');
const uploadStatsToFirestore = require('./upload/uploadStatsToFirestore');
const uploadProfileToAlgolia = require('./upload/uploadProfileToAlgolia');

const crawlOne = async (url) => {
  try {
    console.log(url);
    const playerResponse = await got(url);
    const playerData = scrapePlayerPage(playerResponse.body);
    if (noStats(playerData)) {
      console.error(`skip ${url} because there is no stats.`);
      return;
    }
    if (tooOld(playerData)) {
      console.error(`skip ${url} because the record is too old.`);
      return;
    }

    const cleansedPlayerData = cleansePlayersData(playerData, url);
    console.log(cleansedPlayerData);
    await uploadProfileToAlgolia(cleansedPlayerData);
    await uploadStatsToFirestore(cleansedPlayerData);
    await delay(500);
  } catch (err) {
    console.error(`skip ${url} because unknown error occurs`);
    console.error(err);
  }
};

const tooOld = (playerData) => {
  return parseInt(playerData.battingStats[0].year) <= 1955;
};
const noStats = (playerData) => {
  return !playerData.battingStats[0];
};

module.exports = crawlOne;