const firebase = require('firebase');
require('firebase/firestore');
const firebaseConfig = require('../../config/firebaseConfig');
const deepEqual = require('deep-equal');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const uploadStatsToFirestore = async (playerData) => {
  try {
    const { id } = playerData.profile;

    const battingRecord = {
      profile: playerData.profile,
      battingStats: playerData.battingStats,
    };
    if (await recordUpToDate(battingRecord, 'batting')) {
      console.log('Batting data is already up to date'); 
    } else {
      await db.collection('batting').doc(id).set(battingRecord);
    }

    if (!playerData.pitchingStats) return;
    const pitchingRecord = {
      profile: playerData.profile,
      pitchingStats: playerData.pitchingStats,
    };
    if (await recordUpToDate(pitchingRecord, 'pitching')) {
      console.log('Pitching data is already up to date'); 
    } else {
      await db.collection('pitching').doc(id).set(pitchingRecord);
    }
  } catch (err) {
    console.error(`upload failed! id: ${playerData.profile.id}`);
    console.error(err);
  }
};

const recordUpToDate = async (record, collectionName) => {
  const { id } = record.profile;

  const existingRecordRef = await db.collection(collectionName).doc(id).get();
  const existingRecord = existingRecordRef.data();
  if (!existingRecord) {
    return false;
  }

  existingRecord.profile = {
    ...existingRecord.profile,
    birthDay: existingRecord.profile.birthDay.toDate(),
  };

  return deepEqual(record, existingRecord); 
};

module.exports = uploadStatsToFirestore;