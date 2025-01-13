import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { pluck, mergeMap } from 'rxjs/operators';
import attendantSlice from '../../../store/slices/attendant';

function AttendantSetEpic(action$, state$) {
  return action$.pipe(
    ofType(attendantSlice.actions.AttendantUpdate),
    pluck('payload'),
    mergeMap((payload) => {
      return of(attendantSlice.actions.AttendantSet(payload));
    })
  );
}

export default combineEpics(AttendantSetEpic);
