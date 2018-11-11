import db from './initDb';

export const select = async (id, statsType) => {
  try {
    return await db.collection(statsType).doc(id).get();
  } catch (err) {
    throw new Error(err);
  }
};