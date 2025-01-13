import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

const playerSlice = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    PlayersSet(state, { payload }) {
      return [...payload];
    },
  },
});

export const { PlayersSet } = playerSlice.actions;

export default playerSlice;
