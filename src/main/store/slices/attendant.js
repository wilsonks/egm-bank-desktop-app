import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: null,
  account: '',
  name: '',
  pin: '',
  inserted: false,
  removed: false,
};

const attendantSlice = createSlice({
  name: 'attendant',
  initialState: INITIAL_STATE,
  reducers: {
    AttendantCardInsert(state, { payload }) {
      const { uid, account, name, pin } = payload;
      state.uid = uid;
      state.account = account;
      state.name = name;
      state.pin = pin;
      state.inserted = true;
      state.removed = false;
    },
    AttendantCardRemove(state, { payload }) {
      state.inserted = false;
      state.removed = true;
    },
  },
});

export const { AttendantCardInsert, AttendantCardRemove } =
  attendantSlice.actions;

export default attendantSlice;
