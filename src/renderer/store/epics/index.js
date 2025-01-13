import { combineEpics } from 'redux-observable';

import nfcEpics from './nfc';
import attendantEpics from './attendant';
import userEpics from './user';

const rootEpic = combineEpics(nfcEpics, attendantEpics, userEpics);

export default rootEpic;
