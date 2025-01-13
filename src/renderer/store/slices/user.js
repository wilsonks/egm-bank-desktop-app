import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: '03824ee4',
  account: '9645318040',
  name: 'Wilson',
  role: 'attendant',
  loggedIn: true,
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
      console.log(`UserLoggedOut: ${JSON.stringify(payload)}`);
      state.uid = '';
      state.account = '';
      state.name = '';
      state.role = 'attendant';
      state.loggedIn = false;
    },
  },
});

export const { UserLoggedIn, UserLoggedOut } = userSlice.actions;

export default userSlice;
