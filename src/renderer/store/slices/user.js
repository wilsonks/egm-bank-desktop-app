import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: '03824ee4',
  account: '',
  name: '',
  role: 'attendant',
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    UserLoggedIn(state, { payload }) {
      const { uid, account, name, pin, role } = payload;
      state.uid = uid;
      state.account = account;
      state.name = name;
      state.role = role;
      state.loggedIn = true;
    },
    UserLoggedOut(state, { payload }) {
      state.uid = '';
      state.account = '';
      state.name = '';
      state.role = role;
      state.loggedIn = false;
    },
  },
});

export const { UserLoggedIn, UserLoggedOut } = userSlice.actions;

export default userSlice;
