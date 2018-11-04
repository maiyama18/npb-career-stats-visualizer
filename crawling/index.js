const got = require('got');
const scrapeStats = require('./scrapeStats');

(async () => {
  const response = await got('http://npb.jp/bis/players/61365139.html');
  console.log(scrapeStats(response.body));
})();