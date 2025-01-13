import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { pluck, mergeMap, switchMap, map, catchError } from 'rxjs/operators';
const R = require('ramda');

import attendantSlice from '../../slices/attendant';
import playerSlice from '../../slices/players';

// Function to check if an object with a specific account exists
const hasEntry = (account, attendants) =>
  R.find((attendant) => attendant.account === account, attendants) !==
  undefined;
// Function to check if an object with a specific account exists
const findEntryIndex = (account, attendants) =>
  R.findIndex((attendant) => attendant.account === account, attendants);

function AttendantLoginRequestEpic(action$, state$) {
  return action$.pipe(
    ofType(attendantSlice.actions.AttendantLoginRequest),
    pluck('payload'),
    mergeMap((payload) => {
      const { account, pin } = payload;
      const { attendants = [] } = state$.value.config;
      if (hasEntry(account, attendants)) {
        const entry = attendants[findEntryIndex(account, attendants)];
        if (entry.pin == pin) {
          return of(attendantSlice.actions.AttendantLoginSuccess(entry));
        } else {
          return of(
            attendantSlice.actions.AttendantLoginFailure('Password Mismatch')
          );
        }
      } else {
        return of(
          attendantSlice.actions.AttendantLoginFailure(
            'Account Number Mismatch'
          )
        );
      }
    })
  );
}
function AttendantLoginSuccessEpic(action$, state$) {
  return action$.pipe(
    ofType(attendantSlice.actions.AttendantLoginSuccess),
    pluck('payload'),
    switchMap(() =>
      ajax.getJSON('http://192.168.1.127:9001/GetTestUsersReq').pipe(
        map((response) => playerSlice.actions.PlayersSet(response)),
        catchError((error) =>
          of(attendantSlice.actions.AttendantLoginFailure(error))
        )
      )
    )
  );
}
export default combineEpics(
  AttendantLoginRequestEpic,
  AttendantLoginSuccessEpic
);
