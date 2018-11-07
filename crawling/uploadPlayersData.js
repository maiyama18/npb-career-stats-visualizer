const uploadPlayersData = async (db, playersData) => {
  for (let playerData of playersData) {
    try {
      const { id } = playerData.profile;
      await db.collection('batting').doc(id).set({
        ...playerData.profile,
        stats: playerData.battingStats,
      });

      if (playerData.pitchingStats) {
        await db.collection('pitching').doc(id).set({
          ...playerData.profile,
          stats: playerData.pitchingStats,
        });
      }
      console.log(`uploading ${playerData.profile.name} success`);
    } catch (err) {
      console.log(`uploading ${playerData.profile.name} failed`);
      console.log(playerData);
      console.log(err);
    }
  }
};

module.exports = uploadPlayersData;