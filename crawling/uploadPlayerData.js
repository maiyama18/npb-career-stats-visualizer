const uploadPlayerData = async (db, playerData) => {
  try {
    console.log(`uploading ${playerData.profile.name}...`);
    const { id } = playerData.profile;
    await db.collection('batting').doc(id).set({
      profile: playerData.profile,
      stats: playerData.battingStats,
    });

    if (playerData.pitchingStats) {
      await db.collection('pitching').doc(id).set({
        profile: playerData.profile,
        stats: playerData.pitchingStats,
      });
    }
    console.log('success!');
  } catch (err) {
    console.log('failed!');
    console.log(playerData);
    console.log(err);
  }
};

module.exports = uploadPlayerData;