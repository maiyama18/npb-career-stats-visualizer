import { CHANGE_STATS_TYPE } from './data';

export const graphInitialState = {
  xAxis: 'year',
  yAxis: 'hits',
  yType: 'each',
};

const CHANGE_X_AXIS = 'CHANGE_X_AXIS';
const CHANGE_Y_AXIS = 'CHANGE_Y_AXIS';
const CHANGE_Y_TYPE = 'CHANGE_Y_TYPE';

export const changeXAxis = (xAxis) => ({
  type: CHANGE_X_AXIS,
  payload: {
    xAxis,
  },
});
export const changeYAxis = (yAxis) => ({
  type: CHANGE_Y_AXIS,
  payload: {
    yAxis,
  },
});
export const changeYType = (yType) => ({
  type: CHANGE_Y_TYPE,
  payload: {
    yType,
  },
});

export const graphReducer = (state = graphInitialState, action) => {
  switch (action.type) {
  case CHANGE_X_AXIS:
    return {
      ...state,
      xAxis: action.payload.xAxis,
    };
  case CHANGE_Y_AXIS:
    return {
      ...state,
      yAxis: action.payload.yAxis,
    };
  case CHANGE_Y_TYPE:
    return {
      ...state,
      yType: action.payload.yType,
    };
  case CHANGE_STATS_TYPE:
    return {
      ...state,
      yAxis: action.payload.statsType === 'batting' ? battingYAxisOptions[0].value : pitchingYAxisOptions[0].value,
    };

  default:
    return state;
  }
};

export const xAxisOptions = [
  { key: 'year', text: '西暦', value: 'year' },
  { key: 'age', text: '年齢', value: 'age' },
  { key: 'yearth', text: '何年目', value: 'yearth' },
];
export const battingYAxisOptions = [
  { key: 'hits', text: '安打', value: 'hits' },
  { key: 'homeRuns', text: '本塁打', value: 'homeRuns' },
];
export const pitchingYAxisOptions = [
  { key: 'wins', text: '勝', value: 'wins' },
  { key: 'strikeOuts', text: '奪三振', value: 'strikeOuts' },
];
export const yTypeOptions = [
  { key: 'each', text: '各年', value: 'each' },
  { key: 'cumulative', text: '通算', value: 'cumulative' },
];