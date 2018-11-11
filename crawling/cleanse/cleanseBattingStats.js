const { convertAllStatsValueToNumber, dropYearIfNanOrUndefinedExists } = require('./cleanseUtils');

const cleanseBattingStats = (rawBattingStats, profile) => {
  let battingStats = convertAllStatsValueToNumber(rawBattingStats);
  battingStats = calculateAdditionalBattingStats(battingStats, profile);
  battingStats = dropYearIfNanOrUndefinedExists(battingStats);

  return battingStats;
};

const calculateAdditionalBattingStats = (battingStats, profile) => {
  return battingStats.map(year => {
    year.age = year.year - profile.birthDay.getFullYear();
    year.yearth = year.year - profile.firstYear + 1;
    year.onBasePlusSluggingPercentage = year.onBasePercentage + year.sluggingPercentage;
    return year;
  });
};

module.exports = cleanseBattingStats;