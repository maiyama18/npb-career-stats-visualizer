const firebase = require('firebase');
require('firebase/firestore');
const functions = require('firebase-functions');
const firebaseConfig = require('../firebaseConfig');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
