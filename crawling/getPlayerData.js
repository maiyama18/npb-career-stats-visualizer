const got = require('got');
const scrapeStats = require('./scrapePlayerPage');

const getPlayerData = async (url) => {
  const response = await got(url);
  const rawData = scrapeStats(response.body);

  return rawData;
};

module.exports = getPlayerData;