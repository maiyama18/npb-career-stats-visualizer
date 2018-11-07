const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const frameForProfile = {
  name: 'li#pc_v_name',
  kana: 'li#pc_v_kana',
  team: 'li#pc_v_team',
  handedness: '#pc_bio tbody > tr:nth-last-child(5) td',
  heightAndWeight: '#pc_bio tbody > tr:nth-last-child(4) td',
  birthDay: '#pc_bio tbody > tr:nth-last-child(3) td',
  draftInfo: '#pc_bio tbody > tr:nth-last-child(1) td',
};

const frameForBattingStats = {
  years: {
    _s: '#tablefix_b tr.registerStats',
    _d: [{
      year: 'td:nth-child(1)',
      games: 'td:nth-child(3)',
      plateAppearances: 'td:nth-child(4)',
      atBat: 'td:nth-child(5)',
      runs: 'td:nth-child(6)',
      hits: 'td:nth-child(7)',
      twoBaseHits: 'td:nth-child(8)',
      threeBaseHits: 'td:nth-child(9)',
      homeRuns: 'td:nth-child(10)',
      totalBases: 'td:nth-child(11)',
      runsBattedIn: 'td:nth-child(12)',
      stolenBases: 'td:nth-child(13)',
      caughtStealing: 'td:nth-child(14)',
      sacrificeHits: 'td:nth-child(15)',
      sacrificeFlies: 'td:nth-child(16)',
      basesOnBalls: 'td:nth-child(17)',
      hitByPitch: 'td:nth-child(18)',
      strikeOuts: 'td:nth-child(19)',
      doublePlays: 'td:nth-child(20)',
      battingAverage: 'td:nth-child(21)',
      sluggingPercentage: 'td:nth-child(22)',
      onBasePercentage: 'td:nth-child(23)',
    }],
  },
};

const frameForPitchingStats = {
  years: {
    _s: '#tablefix_p tr.registerStats',
    _d: [{
      year: 'td:nth-child(1)',
      games: 'td:nth-child(3)',
      wins: 'td:nth-child(4)',
      losses: 'td:nth-child(5)',
      save: 'td:nth-child(6)',
      hold: 'td:nth-child(7)',
      holdPoints: 'td:nth-child(8)',
      completeGames: 'td:nth-child(9)',
      shutOuts: 'td:nth-child(10)',
      noWalk: 'td:nth-child(11)',
      winningPercentage: 'td:nth-child(12)',
      battersFaced: 'td:nth-child(13)',
      inningsPitchedInteger: 'td:nth-child(14) th',
      inningsPitchedFractional: 'td:nth-child(14) td',
      hits: 'td:nth-child(15)',
      homeRuns: 'td:nth-child(16)',
      basesOnBalls: 'td:nth-child(17)',
      hitByPitch: 'td:nth-child(18)',
      strikeOuts: 'td:nth-child(19)',
      wildPitches: 'td:nth-child(20)',
      balks: 'td:nth-child(21)',
      runs: 'td:nth-child(22)',
      earnedRuns: 'td:nth-child(23)',
      earnedRunAverage: 'td:nth-child(24)',
    }],
  },
};

const scrapePlayerPage = (html) => {
  const $ = cheerio.load(html);
  jsonframe($);

  const profile = $('body').scrape(frameForProfile);
  const battingResult = $('body').scrape(frameForBattingStats);
  const pitchingResult = $('body').scrape(frameForPitchingStats);

  if (!profile.team) {
    profile.team = null;
  }

  return {
    profile,
    battingStats: battingResult.years,
    pitchingStats: pitchingResult.years.length !== 0 ? pitchingResult.years : null,
  };
};

module.exports = scrapePlayerPage;