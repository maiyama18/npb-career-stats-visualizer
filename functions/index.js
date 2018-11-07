const firebase = require('firebase');
require('firebase/firestore');
const functions = require('firebase-functions');
const firebaseConfig = require('../firebaseConfig');
const crawl = require('./crawling');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

(async () => {
  await crawl(db);
})();

exports.crawl = functions.https.onRequest(async (_request, response) => {
  try {
    await crawl(db);
    response.send('OK');
  } catch (err) {
    response.send(err);
  }
});

