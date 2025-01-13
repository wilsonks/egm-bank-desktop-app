import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = {
  uid: null,
  login: false,
  account: '9645318040',
  pin: '',
};

const attendantSlice = createSlice({
  name: 'attendant',
  initialState: INITIAL_STATE,
  reducers: {
    AttendantLoginRequest(state, { payload }) {
      console.log(`AttendantLoginRequest: ${payload}`);
      state.login = false;
    },
    AttendantLoginSuccess(state, { payload }) {
      console.log(`AttendantLoginSuccess: ${payload}`);
      state.login = true;
    },
    AttendantLoginFailure(state, { payload }) {
      console.log(`AttendantLoginFailure: ${payload}`);
      state.login = false;
    },
    AttendantSet(state, { payload }) {
      return { ...payload };
    },
    AttendantUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
});

export const {
  AttendantSet,
  AttendantUpdate,
  AttendantLoginRequest,
  AttendantLoginSuccess,
  AttendantLoginFailure,
} = attendantSlice.actions;

export default attendantSlice;
