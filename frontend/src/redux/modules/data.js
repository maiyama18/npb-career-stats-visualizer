import { search } from '../../algoria/functions';
import { select } from '../../firestore/functions';

export const dataInitialState = {
  statsType: 'batting',
  query: '',
  searching: false,
  candidates: [],
  selecting: false,
  selected: [],
};

const START_SEARCH = 'START_SEARCH';
const FINISH_SEARCH_SUCCESS = 'FINISH_SEARCH_SUCCESS';
const FINISH_SEARCH_FAILURE = 'FINISH_SEARCH_FAILURE';
const START_SELECT = 'START_SELECT';
const FINISH_SELECT_SUCCESS = 'FINISH_SELECT_SUCCESS';
const FINISH_SELECT_FAILURE = 'FINISH_SELECT_FAILURE';
const REMOVE_SELECTED_PLAYER = 'REMOVE_SELECTED_PLAYER';
export const CHANGE_STATS_TYPE = 'CHANGE_STATS_TYPE';

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

const startSelect = (id) => ({
  type: START_SELECT,
  payload: {
    id,
  },
});
const finishSelectSuccess = (playerData) => ({
  type: FINISH_SELECT_SUCCESS,
  payload: {
    playerData,
  },
});
const finishSelectFailure = () => ({
  type: FINISH_SELECT_FAILURE,
});
export const removeSelectedPlayer = (id) => ({
  type: REMOVE_SELECTED_PLAYER,
  payload: {
    id,
  },
});
export const changeStatsType = (statsType) => ({
  type: CHANGE_STATS_TYPE,
  payload: {
    statsType,
  },
});

export const dataReducer = (state = dataInitialState, action) => {
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
  case START_SELECT:
    return {
      ...state,
      selecting: true,
    };
  case FINISH_SELECT_SUCCESS:
    return {
      ...state,
      selected: [
        ...state.selected,
        action.payload.playerData,
      ],
      selecting: false,
      query: '',
      candidates: [],
    };
  case FINISH_SELECT_FAILURE:
    return {
      ...state,
      selecting: false,
    };
  case REMOVE_SELECTED_PLAYER:
    return {
      ...state,
      selected: state.selected.filter(player => player.profile.id !== action.payload.id),
    };
  case CHANGE_STATS_TYPE:
    return {
      ...state,
      statsType: action.payload.statsType,
      query: '',
      candidates: [],
      selected: [],
    };
  default:
    return state;
  }
};

export const changeQueryThunk = (query) => async (dispatch, getState) => {
  if (query === '') {
    dispatch(startSearch(query));
    dispatch(finishSearchSuccess([]));
    return;
  }

  dispatch(startSearch(query));
  try {
    const { statsType } = getState().data;
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

export const selectPlayerThunk = (id) => async (dispatch, getState) => {
  dispatch(startSelect(id));
  try {
    const { statsType } = getState().data;
    const selectResult = await select(id, statsType);
    const playerData = selectResult.data();
    dispatch(finishSelectSuccess(playerData));
  } catch (err) {
    console.error(err);
    dispatch(finishSelectFailure());
  }
};

export const statsTypeOptions = [
  { key: 'b', text: '打撃成績', value: 'batting' },
  { key: 'p', text: '投球成績', value: 'pitching' },
];