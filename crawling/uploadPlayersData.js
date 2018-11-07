const uploadPlayersData = async (db, playersData) => {
  await Promise.all(playersData.map(playerData => {
    db.collection('batting').add({
      ...playerData.profile,
      stats: playerData.battingStats,
    });

    if (playerData.pitchingStats) {
      db.collection('pitching').add({
        ...playerData.profile,
        stats: playerData.pitchingStats,
      });
    }
  }));
};

module.exports = uploadPlayersData;