const convertAllStatsValueToNumber = stats => {
  return stats.map(year => {
    const convertedYear = {};
    Object.entries(year).forEach(([key, value]) => {
      convertedYear[key] = Number(value);
    });

    return convertedYear;
  });
};

const dropYearIfNanOrUndefinedExists = stats => {
  return stats.filter(year => {
    for (let value of Object.values(year)) {
      if (value === undefined) {
        console.log('undefined exists');
        return false;
      }
      if (isNaN(value)) {
        console.log('nan exists!'); 
        return false;
      }
    }

    return true;
  });
};

module.exports = {
  convertAllStatsValueToNumber,
  dropYearIfNanOrUndefinedExists,
};