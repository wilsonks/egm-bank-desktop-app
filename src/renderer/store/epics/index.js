import { combineEpics } from 'redux-observable';

import nfcEpics from './nfc';

const rootEpic = combineEpics(
  nfcEpics
  // other epics can be added here
);

export default rootEpic;
