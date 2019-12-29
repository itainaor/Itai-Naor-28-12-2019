import { Component, OnInit } from '@angular/core';
import {AppReducerState, reducer} from '../../shared/reducers/appReducer';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ACTION_AUTOCOMPLETE_SEARCH, ACTION_CHANGE_TOGGLE, ACTION_UPDATE_CITIES} from '../../shared/reducers/appActions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public reducer: AppReducerState;

  constructor(private user: UserService, private router: Router, private store: Store<AppReducerState>) { }

  ngOnInit() {
    this.user.getAllStates().subscribe((state) => {
      this.reducer  = state;
    }, () => {
    });
  }

  handleToggle(position: number) {
    this.store.dispatch({type: ACTION_CHANGE_TOGGLE, payload: position});
    this.router.navigate([this.reducer.toggles[position].route]);
  }


}
