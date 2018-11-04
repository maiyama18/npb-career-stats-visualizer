const getPlayerData = require('./getPlayerData');

const urls = [
  'http://npb.jp/bis/players/21425116.html',
  'http://npb.jp/bis/players/61365139.html',
  'http://npb.jp/bis/players/23925136.html',
];

(async () => {
  for (let url of urls) {
    const data = await getPlayerData(url);
    console.log(JSON.stringify(data));
  }
})();