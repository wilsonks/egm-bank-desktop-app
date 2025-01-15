import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  uri: {
    playersUri: {
      scheme: 'http',
      host: 'localhost',
      port: '9001',
      path: '/GetTestUsersReq',
      query: '',
      fragment: '',
    },
    ChangeNickName: {
      scheme: 'http',
      host: 'localhost',
      port: '9001',
      path: '/api/v1/ChangeNickName',
    },
    ChangePinNumber: {
      scheme: 'http',
      host: 'localhost',
      port: '9001',
      path: '/api/v1/ChangePinNumber',
    },
  },

  slots: [
    { EgmId: '1', ipAddress: '192.168.1.152' },
    { EgmId: '2', ipAddress: '192.168.1.234' },
    { EgmId: '3', ipAddress: '192.168.1.151' },
  ],
  status: {
    delivery: false,
    nfc: false,
    network: false,
  },
  players: [{ uid: '037c0ce4' }, { uid: '93614fe4' }],
  attendants: [
    { uid: '03824ee4', account: '9645318040', name: 'Wilson', pin: 2222 },
    { uid: '53eef7e3', account: '6200585297', name: 'Monika', pin: 9999 },
  ],
  managers: [{ uid: 'd36defe3' }, { uid: '639447e4' }],
  admins: [{ uid: '13339fe4' }, { uid: 'e378a6e4' }],
  developers: [{ uid: '53d73de4' }, { uid: 'c39950e4' }],
};

const configSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    nfcReaderAttached(state, { payload }) {
      state.status.nfc = true;
    },
    nfcReaderDetached(state, { payload }) {
      state.status.nfc = false;
    },
  },
});

export const { nfcReaderAttached, nfcReaderDetached } = configSlice.actions;

export default configSlice;
