import {reducer, AppReducerState} from './appReducer';
import {ActionReducerMap} from '@ngrx/store';

interface AppState {
  userReducer: AppReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  userReducer: reducer
}


