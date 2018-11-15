import { CHANGE_STATS_TYPE } from './data';

export const graphInitialState = {
  xAxis: { key: 'year', text: '西暦', value: 'year' },
  yAxis: { key: 'games', text: '試合', value: 'games' },
  yearType: { key: 'each', text: '各年', value: 'each' },
};

const CHANGE_X_AXIS = 'CHANGE_X_AXIS';
const CHANGE_Y_AXIS = 'CHANGE_Y_AXIS';
const CHANGE_YEAR_TYPE = 'CHANGE_YEAR_TYPE';

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
export const changeYearType = (yearType) => ({
  type: CHANGE_YEAR_TYPE,
  payload: {
    yearType,
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
  case CHANGE_YEAR_TYPE:
    return {
      ...state,
      yearType: action.payload.yearType,
      yAxis: (action.payload.yearType.value === 'cumulative' && state.yAxis.eachYearOnly) ? graphInitialState.yAxis : state.yAxis,
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
  { key: 'battingAverage', text: '打率', value: 'battingAverage', eachYearOnly: true },
  { key: 'sluggingPercentage', text: '長打率', value: 'sluggingPercentage', eachYearOnly: true },
  { key: 'onBasePercentage', text: '出塁率', value: 'onBasePercentage', eachYearOnly: true },
  { key: 'onBasePlusSluggingPercentage', text: 'OPS', value: 'onBasePlusSluggingPercentage', eachYearOnly: true },

  { key: 'games', text: '試合', value: 'games' },
  { key: 'plateAppearances', text: '打席', value: 'plateAppearances' },
  { key: 'atBat', text: '打数', value: 'atBat' },
  { key: 'hits', text: '安打', value: 'hits' },
  { key: 'twoBaseHits', text: '二塁打', value: 'twoBaseHits' },
  { key: 'threeBaseHits', text: '三塁打', value: 'threeBaseHits' },
  { key: 'homeRuns', text: '本塁打', value: 'homeRuns' },
  { key: 'totalBases', text: '塁打', value: 'totalBases' },
  { key: 'runsBattedIn', text: '打点', value: 'runsBattedIn' },
  { key: 'runs', text: '得点', value: 'runs' },
  { key: 'strikeOuts', text: '三振', value: 'strikeOuts' },
  { key: 'basesOnBalls', text: '四球', value: 'basesOnBalls' },
  { key: 'hitByPitch', text: '死球', value: 'hitByPitch' },
  { key: 'stolenBases', text: '盗塁', value: 'stolenBases' },
  { key: 'caughtStealing', text: '盗塁死', value: 'caughtStealing' },
  { key: 'sacrificeHits', text: '犠打', value: 'sacrificeHits' },
  { key: 'sacrificeFlies', text: '犠飛', value: 'sacrificeFlies' },
  { key: 'doublePlays', text: '併殺', value: 'doublePlays' },
];
export const pitchingYAxisOptions = [
  { key: 'winningPercentage', text: '勝率', value: 'winningPercentage', eachYearOnly: true },
  { key: 'earnedRunAverage', text: '防御率', value: 'earnedRunAverage', eachYearOnly: true },
  { key: 'walksPlusHitsPerInning', text: 'WHIP', value: 'walksPlusHitsPerInning', eachYearOnly: true },

  { key: 'games', text: '試合', value: 'games' },
  { key: 'wins', text: '勝', value: 'wins' },
  { key: 'losses', text: '負', value: 'losses' },
  { key: 'save', text: 'セーブ', value: 'save' },
  { key: 'hold', text: 'ホールド', value: 'hold' },
  { key: 'holdPoints', text: 'ホールドポイント', value: 'holdPoints' },
  { key: 'completeGames', text: '完全試合', value: 'completeGames' },
  { key: 'shotOuts', text: '完封', value: 'shotOuts' },
  { key: 'noWalk', text: '無四球', value: 'noWalk' },
  { key: 'inningsPitched', text: '投球回', value:'inningsPitched' },
  { key: 'battersFaced', text: '対戦打者', value:'battersFaced' },
  { key: 'hits', text: '被安打', value: 'hits' },
  { key: 'homeRuns', text: '被本塁打', value: 'homeRuns' },
  { key: 'strikeOuts', text: '奪三振', value: 'strikeOuts' },
  { key: 'basesOnBalls', text: '与四球', value: 'basesOnBalls' },
  { key: 'hitByPitch', text: '与死球', value: 'hitByPitch' },
  { key: 'wildPitches', text: '暴投', value: 'wildPitches' },
  { key: 'balks', text: 'ボーク', value: 'balks' },
  { key: 'runs', text: '失点', value: 'runs' },
  { key: 'earnedRuns', text: '自責点', value: 'earnedRuns' },
];
export const yearTypeOptions = [
  { key: 'each', text: '各年', value: 'each' },
  { key: 'cumulative', text: '通算', value: 'cumulative' },
];