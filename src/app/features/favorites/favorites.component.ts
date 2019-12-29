import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AppReducerState, reducer} from '../../shared/reducers/appReducer';
import {ACTION_AUTOCOMPLETE_SEARCH, ACTION_CHANGE_TOGGLE} from '../../shared/reducers/appActions';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public reducer: AppReducerState;

  constructor(private user: UserService, private router: Router, private store: Store<AppReducerState>) { }

  ngOnInit() {
    this.reducer = this.user.globalReducer;
  }

  openLocation(fav) {
    this.store.dispatch({type: ACTION_CHANGE_TOGGLE, payload: 0});
    this.store.dispatch({type: ACTION_AUTOCOMPLETE_SEARCH, payload: {id: fav.id, name: fav.name}});
    this.router.navigate(['']);

  }
}
