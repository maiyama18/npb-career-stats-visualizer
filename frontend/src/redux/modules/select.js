import { search } from '../../algoria/functions';

export const selectInitialState = {
  statsType: 'batting',
  query: '',
  searching: false,
  candidates: [],
};

const START_SEARCH = 'START_SEARCH';
const FINISH_SEARCH_SUCCESS = 'FINISH_SEARCH_SUCCESS';
const FINISH_SEARCH_FAILURE = 'FINISH_SEARCH_FAILURE';

const startSearch = (query) => ({
  type: START_SEARCH,
  payload: {
    query,
  },
});
const finishSearchSuccess = (candidates) => ({
  type: FINISH_SEARCH_SUCCESS,
  payload: {
    candidates,
  },
});
const finishSearchFailure = () => ({
  type: FINISH_SEARCH_FAILURE,
});
export const changeQueryThunk = (query) => async (dispatch, getState) => {
  if (query === '') {
    dispatch(startSearch(query));
    dispatch(finishSearchSuccess([]));
    return;
  }

  dispatch(startSearch(query));
  try {
    const { statsType } = getState().select;
    const searchResult = await search(query, statsType);
    const candidates = searchResult.hits.map(player => ({
      id: player.id,
      name: player.name,
      team: player.team,
    }));
    dispatch(finishSearchSuccess(candidates));
  } catch (err) {
    console.error(err);
    dispatch(finishSearchFailure());
  }
};


export const selectReducer = (state = selectInitialState, action) => {
  switch (action.type) {
  case START_SEARCH:
    return {
      ...state,
      query: action.payload.query,
      searching: true,
    };
  case FINISH_SEARCH_SUCCESS:
    return {
      ...state,
      candidates: action.payload.candidates,
      searching: false,
    };
  case FINISH_SEARCH_FAILURE:
    return {
      ...state,
      searching: false,
    };
  default:
    return state;
  }
};