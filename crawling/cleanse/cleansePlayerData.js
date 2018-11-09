const cleanseProfile = require('./cleanseProfile');
const cleanseBattingStats = require('./cleanseBattingStats');
const cleansePitchingStats = require('./cleansePitchingStats');

const cleansePlayerData = (rawData, url) => {
  const profile = cleanseProfile(rawData.profile, rawData.battingStats, rawData.pitchingStats, url);
  const battingStats = cleanseBattingStats(rawData.battingStats, profile);
  const pitchingStats = rawData.pitchingStats ? cleansePitchingStats(rawData.pitchingStats, profile) : null;
  
  return {
    profile,
    battingStats,
    pitchingStats,
  };
};

module.exports = cleansePlayerData;