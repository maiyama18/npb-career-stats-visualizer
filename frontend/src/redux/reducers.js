import { combineReducers } from 'redux';
import { selectReducer, selectInitialState } from './modules/select';

export const initialState = {
  select: selectInitialState,
};

export default combineReducers({
  select: selectReducer,
});