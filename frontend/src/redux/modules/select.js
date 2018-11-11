export const selectInitialState = {
  query: '',
};

const CHANGE_QUERY = 'CHANGE_QUERY';

export const changeQuery = (query) => ({
  type: CHANGE_QUERY,
  payload: {
    query,
  },
});

export const selectReducer = (state = selectInitialState, action) => {
  switch (action.type) {
  case CHANGE_QUERY:
    return {
      ...state,
      query: action.payload.query,
    };
  default:
    return state;
  }
};