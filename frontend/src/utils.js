import { battingYAxisOptions, pitchingYAxisOptions, yearTypeOptions, xAxisOptions } from './redux/modules/graph';

export const teamKanjis = {
  'C': '鯉',
  'T': '虎',
  'DB': '星',
  'G': '巨',
  'D': '竜',
  'S': '燕',
  'H': '鷹',
  'L': '猫',
  'E': '鷲',
  'BS': '檻',
  'F': '公',
  'M': '鴎',
};

export const makeDataForNivo = (selected, xAxis, yAxis, yearType) => {
  let data = selected.map(player => {
    return {
      id: player.profile.name,
      data: player.stats.map(year => ({
        x: year[xAxis.key],
        y: year[yAxis.key],
      })),
    };
  });
  if (yearType.key === 'cumulative') {
    data = data.map(player => {
      let sum = 0;
      return {
        ...player,
        data: player.data.map(year => {
          sum += year.y;
          return {
            ...year,
            y: sum,
          };
        }),
      };
    });
  }

  return data;
};

export const retrieveOptionFromValue = (value, type) => {
  switch (type) {
  case 'xAxis':
    return xAxisOptions.find(o => o.value === value);
  case 'batting':
    return battingYAxisOptions.find(o => o.value === value);
  case 'pitching':
    return pitchingYAxisOptions.find(o => o.value === value);
  case 'yearType':
    return yearTypeOptions.find(o => o.value === value);
  default:
    throw new Error(`invalid option type: ${type}`);
  }
};