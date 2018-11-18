import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import ReactGA from 'react-ga';
import App from './components/App';
import store from './redux/store';

ReactGA.initialize('UA-129391439-1');
ReactGA.pageview('/');

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById('root')
);
