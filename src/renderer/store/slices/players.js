import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

const playerSlice = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    PlayersRefresh(state, { payload }) {},
    PlayersSet(state, { payload }) {
      return [...payload];
    },
  },
});

export const { PlayersSet, PlayersRefresh } = playerSlice.actions;

export default playerSlice;
