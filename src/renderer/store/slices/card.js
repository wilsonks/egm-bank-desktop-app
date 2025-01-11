import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

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
      return { ...state, ...payload };
    },
  },
});

export const { cardSet, cardUpdate, cardReset } = cardSlice.actions;
export default cardSlice;
