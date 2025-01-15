import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uid: '',
  nickNameFormOn: false,
  pinNumberFormOn: false,
};

const cardSlice = createSlice({
  name: 'card',
  initialState: INITIAL_STATE,
  reducers: {
    cardNickNameFormOn(state, { payload }) {
      state.nickNameFormOn = true;
    },
    cardNickNameFormOff(state, { payload }) {
      state.nickNameFormOn = false;
    },
    cardNickNameChangeReq(state, { payload }) {},
    cardNickNameChangeSuccess(state, { payload }) {},
    cardNickNameChangeFailed(state, { payload }) {},

    cardPinNumberChangeFormOn(state, { payload }) {
      state.pinNumberFormOn = true;
    },
    cardPinNumberChangeFormOff(state, { payload }) {
      state.pinNumberFormOn = false;
    },
    cardPinNumberChangeChangeReq(state, { payload }) {},
    cardPinNumberChangeChangeSuccess(state, { payload }) {},
    cardPinNumberChangeChangeFailed(state, { payload }) {},

    cardSessionSetOff(state, { payload }) {},
    cardWalletTopUpReq(state, { payload }) {},
    cardWalletTopUpSuccess(state, { payload }) {},
    cardWalletTopDownReq(state, { payload }) {},
    cardWalletTopDownSuccess(state, { payload }) {},
    cardWalletResetReq(state, { payload }) {},
    cardWalletResetSuccess(state, { payload }) {},
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
