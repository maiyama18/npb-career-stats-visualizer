const crawl = require('./crawl.js');

const type = process.argv[2];
if (!['all', 'active'].includes(type)) {
  console.log('Usage: node index.js (all|active)');
  process.exit(1);
}

const topUrl = `http://npb.jp/bis/players/${type}/index.html`;

crawl(topUrl)
  .then(() => console.log('crawl finished'));
