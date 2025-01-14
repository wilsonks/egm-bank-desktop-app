import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: '637b2a0a',
  id: 1,
  role: 'player',
  nickname: 'Ravi',
  firstName: 'Ravi',
  lastName: 'Gurram',
  wallet: 0,
  pin: 1234,
  isPlaying: false,
  createdAt: '2025/01/15 03:42:12.999',
  updatedAt: '2025/01/15 03:42:13.001',
};

const cardSlice = createSlice({
  name: 'card',
  initialState: INITIAL_STATE,
  reducers: {
    cardSet(state, { payload }) {
      return { ...payload };
    },
    cardUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
    cardReset(state, { payload }) {
      return INITIAL_STATE;
    },
  },
});

export const { cardSet, cardUpdate, cardReset } = cardSlice.actions;
export default cardSlice;
