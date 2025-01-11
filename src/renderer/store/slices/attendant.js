import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: null,
  inserted: false,
  removed: false,
};

const attendantSlice = createSlice({
  name: 'attendant',
  initialState: INITIAL_STATE,
  reducers: {
    AttanderSet(state, { payload }) {
      return { ...payload };
    },
    AttanderUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { AttanderSet, AttanderUpdate } = attendantSlice.actions;

export default attendantSlice;
