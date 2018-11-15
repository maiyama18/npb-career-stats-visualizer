const cleanseProfile = (rawProfile, rawBattingStats, rawPitchingStats, url) => {
  const id = extract(url, /\/(\d+).html/);
  const name = rawProfile.name.replace(/ /g, '');
  const kana = rawProfile.kana.replace(/・/g, '');
  const team = teamNameToId[rawProfile.team] || 'UNDEFINED';
  const position = (rawPitchingStats !== null) ? 'P' : 'B';
  const pitchHand = (rawProfile.handedness[0] === '右') ? 'R' : 'L';
  const batHand = (rawProfile.handedness[2] === '右') ? 'R' : 'L';
  const height = parseInt(extract(rawProfile.heightAndWeight, /(\d+)cm/));
  const weight = parseInt(extract(rawProfile.heightAndWeight, /(\d+)kg/));
  const birthDay = parseDate(rawProfile.birthDay);
  const firstYear = rawProfile.draftInfo ? parseInt(extract(rawProfile.draftInfo, /(\d+)年/)) + 1 : rawBattingStats[0].year;

  return {
    id,
    name,
    kana,
    team,
    position,
    pitchHand,
    batHand,
    height,
    weight,
    birthDay,
    firstYear,
  };
};

const teamNameToId = {
  '広島東洋カープ': 'C',
  '阪神タイガース': 'T',
  '横浜DeNAベイスターズ': 'DB',
  '読売ジャイアンツ': 'G',
  '中日ドラゴンズ': 'D',
  '東京ヤクルトスワローズ': 'S',
  '福岡ソフトバンクホークス': 'H',
  '埼玉西武ライオンズ': 'L',
  '東北楽天ゴールデンイーグルス': 'E',
  'オリックスバファローズ': 'BS',
  '北海道日本ハムファイターズ': 'F',
  '千葉ロッテマリーンズ': 'M',
};

const parseDate = (dateStr) => {
  const dateArr = dateStr.match(/(\d+)/g).map(s => parseInt(s));
  const year = dateArr[0] || 1990;
  const monthIndex = dateArr[1] ? dateArr[1] - 1 : 4;
  const dayIndex = dateArr[2] ? dateArr[2] - 1 : 1;
  return new Date(year, monthIndex, dayIndex);
};

const extract = (str, regExp) => {
  return str.match(regExp)[1];
};

module.exports = cleanseProfile;