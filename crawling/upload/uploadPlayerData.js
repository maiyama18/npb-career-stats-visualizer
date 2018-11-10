const deepEqual = require('deep-equal');

const uploadPlayerData = async (db, playerData) => {
  try {
    const { id } = playerData.profile;

    const battingRecord = {
      profile: playerData.profile,
      battingStats: playerData.battingStats,
    };
    if (await recordUpToDate(battingRecord, db, 'batting')) {
      console.log('Batting data is already up to date'); 
    } else {
      await db.collection('batting').doc(id).set(battingRecord);
    }

    if (!playerData.pitchingStats) return;
    const pitchingRecord = {
      profile: playerData.profile,
      pitchingStats: playerData.pitchingStats,
    };
    if (await recordUpToDate(pitchingRecord, db, 'pitching')) {
      console.log('Pitching data is already up to date'); 
    } else {
      await db.collection('pitching').doc(id).set(pitchingRecord);
    }
  } catch (err) {
    console.log('upload failed!');
    console.log(err);
  }
};

const recordUpToDate = async (record, db, collectionName) => {
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

module.exports = uploadPlayerData;