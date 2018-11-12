import { combineReducers } from 'redux';
import { dataReducer, dataInitialState } from './modules/data';
import { graphReducer, graphInitialState } from './modules/graph';

export const initialState = {
  data: dataInitialState,
  graph: graphInitialState,
};

export default combineReducers({
  data: dataReducer,
  graph: graphReducer,
});