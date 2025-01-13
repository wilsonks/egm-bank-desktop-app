import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { pluck, mergeMap, switchMap, map, catchError } from 'rxjs/operators';
const R = require('ramda');

import attendantSlice from '../../slices/attendant';
import userSlice from '../..//slices/user';

function AttendantLoggedInEpic(action$, state$) {
  return action$.pipe(
    ofType(attendantSlice.actions.AttendantLoginSuccess),
    pluck('payload'),
    mergeMap((payload) => {
      return of(
        userSlice.actions.UserLoggedIn({
          ...payload,
          pin: '',
          role: 'attendant',
        })
      );
    })
  );
}

export default combineEpics(AttendantLoggedInEpic);
