const crawlPlayersDataForOneInitial = require('./crawlPlayersDataForOneInitial');
const getInitialIndexUrls = require('./getInitialIndexUrls');
const uploadPlayersData = require('./uploadPlayersData');

const topUrl = 'http://npb.jp/bis/players/all/index.html';

(async () => {
  const initialIndexUrls = await getInitialIndexUrls(topUrl);
  for (let url of initialIndexUrls) {
    const playersData = await crawlPlayersDataForOneInitial(url);
    await uploadPlayersData(playersData);
  }
})();