import { configureStore } from '@reduxjs/toolkit';
import shoeSlice from './slices/shoe';
import configSlice from './slices/config';
import attendantSlice from './slices/attendant';

export const store = configureStore({
  reducer: {
    shoe: shoeSlice.reducer,
    config: configSlice.reducer,
    attendant: attendantSlice.reducer,
  },
});

export const actions = {
  shoe: shoeSlice.actions,
  config: configSlice.actions,
  attendant: attendantSlice.actions,
};
