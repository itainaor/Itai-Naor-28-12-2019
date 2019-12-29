import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExtractorService} from './extractor/extractor.service';
import {UserService} from '../../shared/services/user.service';
import {AppReducerState, reducer} from '../../shared/reducers/appReducer';
import {
  ACTION_ADD_FAVORITE,
  ACTION_AUTOCOMPLETE_SEARCH,
  ACTION_CURRENT_CONDITION,
  ACTION_FORECAST, ACTION_REMOVE_FAVORITE,
  ACTION_UPDATE_CITIES
} from '../../shared/reducers/appActions';
import {ToasterService} from 'angular2-toaster';
import {forkJoin} from 'rxjs';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public reducer: AppReducerState;
  public selectedCity: any;

  constructor(private store: Store<AppReducerState>, private http: HttpClient, private extractor: ExtractorService, private toasterService: ToasterService, private user: UserService) { }

  ngOnInit() {
    this.user.getAllStates().subscribe((state) => {
      this.reducer  = state;
    }, () => {
    });
    this.selectedCity = Object.assign({}, this.reducer.autocompleteSearch);
    this.doSelect();
  }

  doSearch(e) {
    let cities = [];
    if (!e.term) {
      this.store.dispatch( {type: ACTION_UPDATE_CITIES, payload: cities});
      return;
    }
    this.http.get('https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=1TPRKkt33Ems8fy00UWSEQknQ95m6GtL&q=' + e.term).subscribe((response: any[]) => {
        response.forEach((item) => {
          cities = [...cities, {id: item.Key, name: item.LocalizedName}];
        });
        this.store.dispatch( {type: ACTION_UPDATE_CITIES, payload: cities});
      }, (e) => {
      this.toasterService.pop('error', 'Error', 'No date was received');
    });
  }

  doSelect() {
    if (!this.reducer.autocompleteSearch) {
      return;
    }
    this.reducer.autocompleteSearch.isFavorite = this.getFavoriteStatus();
    this.store.dispatch({type: ACTION_AUTOCOMPLETE_SEARCH, payload: this.reducer.autocompleteSearch});

    const request1 =  this.http.get('https://dataservice.accuweather.com/currentconditions/v1/' + this.reducer.autocompleteSearch.id + '?apikey=1TPRKkt33Ems8fy00UWSEQknQ95m6GtL');
    const request2 = this.http.get('https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + this.reducer.autocompleteSearch.id + '?apikey=1TPRKkt33Ems8fy00UWSEQknQ95m6GtL&metric=true');

    forkJoin(request1, request2).subscribe((response) => {
      const currentCondition = {value: this.extractor.getMetricValue(response[0]), unit: this.extractor.getMetricUnit(response[0]),
                              icon: this.extractor.getWeatherIcon(response[0]), text: this.extractor.getWeatherText(response[0])};
      this.store.dispatch({type: ACTION_CURRENT_CONDITION, payload: currentCondition});

      const fiveDays = this.getFiveDaysData(response[1]);
      this.store.dispatch({type: ACTION_FORECAST, payload: fiveDays});

    }, (e) => {
      this.toasterService.pop('error', 'Error', 'No date was received');
    });
  }

  getFiveDaysData(fiveDaysRes) {
    const forecast = [];
    fiveDaysRes.DailyForecasts.forEach((item) => {
      forecast.push({date: new Date(item.Date), value: this.extractor.getForecastValue(item), unit: this.extractor.getForecastUnit(item),
                    icon: this.extractor.getForecastIcon(item), text: this.extractor.getForecastText(item)});
    });
    return forecast;
  }

  emptyList() {
    this.store.dispatch({type: ACTION_UPDATE_CITIES, payload: []});
    this.store.dispatch({type: ACTION_FORECAST, payload: []});
  }

  favoriteHandle() {
    const search = this.reducer.autocompleteSearch;
    search.isFavorite = !search.isFavorite;
    this.store.dispatch({type: ACTION_AUTOCOMPLETE_SEARCH, payload: Object.assign(this.reducer.autocompleteSearch, this.reducer.currentCondition)});
    const action = this.reducer.autocompleteSearch.isFavorite ? ACTION_ADD_FAVORITE : ACTION_REMOVE_FAVORITE;
    this.store.dispatch({type: action});
  }

  getFavoriteStatus() {
    const favoriteObj = this.reducer.favorites.filter((item: any) => {
      return item.id === this.reducer.autocompleteSearch.id;
    });
    if (favoriteObj.length > 0) {
      return true;
    }
    return false;
  }
}
