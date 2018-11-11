const { convertAllStatsValueToNumber, dropYearIfNanOrUndefinedExists } = require('./cleanseUtils');

const cleansePitchingStats = (rawPitchingStats, profile) => {
  let pitchingStats = convertAllStatsValueToNumber(rawPitchingStats);
  pitchingStats = calculateAdditionalPitchingStats(pitchingStats, profile);
  pitchingStats = dropYearIfNanOrUndefinedExists(pitchingStats);

  return pitchingStats;
};

const calculateAdditionalPitchingStats = (pitchingStats, profile) => {
  return pitchingStats.map(year => ({
    ...year,
    age: year.year - profile.birthDay.getFullYear(),
    yearth: year.year - profile.firstYear + 1,
    inningsPitched: convertPitchingInning(year.inningsPitchedInteger, year.inningsPitchedFractional),
    walksPlusHitsPerInning: (year.hits + year.basesOnBalls) ? 0 : (year.hits + year.basesOnBalls) / year.inningPitched,
  }));
};

const convertPitchingInning = (integer, fractional) => {
  if (!fractional) return integer;

  return integer + fractional * 3.3333;
};

module.exports = cleansePitchingStats;