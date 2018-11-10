const crawl = require('./crawl.js');
const crawlOne = require('./crawlOne.js');

const type = process.argv[2];
if (!['all', 'active', 'one'].includes(type)) {
  console.log('Usage: node index.js (all|active|one <url>)');
  process.exit(1);
}

if (type === 'one') {
  const url = process.argv[3];
  crawlOne(url)
    .then(() => console.log('crawlOne finished'));
} else {
  const topUrl = `http://npb.jp/bis/players/${type}/index.html`;
  crawl(topUrl)
    .then(() => console.log('crawl finished'));
}

