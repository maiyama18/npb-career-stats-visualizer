import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { initialState } from './reducers';

const middleWares = [thunk];
const enhancers = [applyMiddleware(...middleWares)];

const reduxDevtoolsExtension = window.devToolsExtension;
if (process.env.NODE_ENV === 'development' && typeof reduxDevtoolsExtension === 'function') {
  enhancers.push(reduxDevtoolsExtension());
}

export default createStore(rootReducer, initialState, compose(...enhancers));