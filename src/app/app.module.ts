import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { HeaderComponent } from './features/header/header.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers} from './shared/reducers/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { TemperaturePipe } from './shared/pipes/temperature.pipe';
import {UserService} from './shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FavoritesComponent,
    TemperaturePipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {}),
    RouterModule.forRoot([
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: '',
        component: HomepageComponent
      },
    ]),
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
