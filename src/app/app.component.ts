import { Component } from '@angular/core';
import {AppReducerState} from './shared/reducers/appReducer';
import {UserService} from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrl';

  constructor(private user: UserService) {
    this.user.getAllStates().subscribe((state) => {
      this.user.globalReducer = state;
    }, () => {
    });  }
}
