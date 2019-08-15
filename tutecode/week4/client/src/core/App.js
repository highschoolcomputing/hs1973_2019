import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import Router from './Router';
import configureStore from '../store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default hot(module)(App);
