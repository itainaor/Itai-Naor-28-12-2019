import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppReducerState} from '../reducers/appReducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public globalReducer: AppReducerState;

  constructor(private store: Store<any>) { }

  getAllStates() {
    return this.store.select('userReducer');
  }
}
