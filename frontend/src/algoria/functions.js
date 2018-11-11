import { battingIndex, pitchingIndex } from './initIndices';

export const search = (query, statsType) => {
  const index = (statsType === 'batting') ? battingIndex : pitchingIndex;
  return new Promise((resolve, reject) => {
    index.search({
      query,
      attributesToRetrieve: ['id', 'name', 'team'],
      hitsPerPage: 10,
    }, (err, content) => {
      if (err) reject(err);
      resolve(content);
    });
  });
};
