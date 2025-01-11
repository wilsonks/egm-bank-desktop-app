import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

const configSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    configSet(state, { payload }) {
      return { ...payload };
    },
    configUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { configSet, configUpdate } = configSlice.actions;

export default configSlice;
