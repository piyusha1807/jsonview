import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';

const middlewares = [thunk, promiseMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
