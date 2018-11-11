const algoliasearch = require('algoliasearch');
const algoliaConfig = require('../config/algoliaConfig');

const client = algoliasearch(algoliaConfig.appId, algoliaConfig.searchAPIKey);

export const battingIndex = client.initIndex('batting');
export const pitchingIndex = client.initIndex('pitching');
