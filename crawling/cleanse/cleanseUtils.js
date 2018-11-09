const convertAllStatsValueToNumber = stats => {
  return stats.map(year => {
    const convertedYear = {};
    Object.entries(year).forEach(([key, value]) => {
      convertedYear[key] = Number(value);
    });

    return convertedYear;
  });
};

const dropYearIfNanExists = stats => {
  return stats.filter(year => {
    Object.values(year).forEach(value => {
      if (isNaN(value)) {
        console.log('nan exists!'); 
        return false;
      }
    });

    return true;
  });
};

module.exports = {
  convertAllStatsValueToNumber,
  dropYearIfNanExists,
};