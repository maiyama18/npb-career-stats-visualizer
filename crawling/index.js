const getPlayersDataForOneInitial = require('./getPlayersDataForOneInitial');

(async () => {
  await getPlayersDataForOneInitial('http://npb.jp/bis/players/all/index_a.html');
})();