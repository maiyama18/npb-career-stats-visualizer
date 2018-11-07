const got = require('got');
const scrapePlayerPage = require('./scrapePlayerPage');
const cleanseScrapedData = require('./cleanseScrapedData');

const getPlayerData = async (url) => {
  const response = await got(url);
  const rawData = scrapePlayerPage(response.body);
  const data = cleanseScrapedData(rawData);

  return data;
};

module.exports = getPlayerData;