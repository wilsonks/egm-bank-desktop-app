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
    AttendantSet(state, { payload }) {
      return { ...payload };
    },
    AttendantUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const { AttendantSet, AttendantUpdate } = attendantSlice.actions;

export default attendantSlice;
