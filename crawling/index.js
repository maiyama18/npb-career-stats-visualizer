const crawlPlayersDataForOneChar = require('./crawlPlayersDataForOneInitial');

(async () => {
  await crawlPlayersDataForOneChar('http://npb.jp/bis/players/all/index_a.html');
})();