import { createStore, compose } from 'redux';
import rootReducer, { initialState } from './reducers';

const enhancers = [];

const reduxDevtoolsExtension = window.devToolsExtension;
if (process.env.NODE_ENV === 'development' && typeof reduxDevtoolsExtension === 'function') {
  enhancers.push(reduxDevtoolsExtension());
}

export default createStore(rootReducer, initialState, compose(...enhancers));