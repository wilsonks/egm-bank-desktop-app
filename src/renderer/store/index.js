import {
  configureStore,
  compose,
  applyMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import logger from 'redux-logger';
import cardSlice from './slices/card';
import configSlice from './slices/config';
import attendantSlice from './slices/attendant';
import userSlice from './slices/user';

import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    config: configSlice.reducer,
    attendant: attendantSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, epicMiddleware),
  devTools: false,
  preloadedState: {},
});

epicMiddleware.run(rootEpic); // Run the root epic

export const actions = {
  card: cardSlice.actions,
  config: configSlice.actions,
  attendant: attendantSlice.actions,
  user: userSlice.actions,
};
