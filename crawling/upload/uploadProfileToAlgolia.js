const algoliasearch = require('algoliasearch');
const algoliaConfig = require('../../config/algoliaConfig');

const client = algoliasearch(algoliaConfig.appId, algoliaConfig.adminAPIKey);

const uploadProfileToAlgolia = async (playerData) => {
  try {
    const { profile } = playerData;
    profile.objectID = profile.id;

    const battingIndex = client.initIndex('batting');
    await addObject(profile, battingIndex);

    if (playerData.pitchingStats) {
      const pitchingIndex = client.initIndex('pitching');
      await addObject(profile, pitchingIndex);
    }
  } catch (err) {
    console.log(err);
  }
};

const addObject = (object, index) => {
  return new Promise((resolve, reject) => {
    index.addObject(object, (err, content) => {
      if (err) reject(err);
      resolve(content);
    });
  });
};

module.exports = uploadProfileToAlgolia;
