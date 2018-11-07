const firebase = require('firebase');
require('firebase/firestore');
const firebaseConfig = require('../firebaseConfig');
const crawl = require('./crawl.js');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const type = process.argv[2];
if (!['all', 'active'].includes(type)) {
  console.log('Usage: node index.js (all|active)');
  process.exit(1);
}

const topUrl = `http://npb.jp/bis/players/${type}/index.html`;

crawl(db, topUrl)
  .then(() => console.log('crawl finished'));
