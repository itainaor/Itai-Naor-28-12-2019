import * as ts from './appActions';
import {
  ACTION_ADD_FAVORITE,
  ACTION_AUTOCOMPLETE_SEARCH, ACTION_CHANGE_TOGGLE,
  ACTION_CURRENT_CONDITION,
  ACTION_FORECAST,
  ACTION_REMOVE_FAVORITE,
  ACTION_UPDATE_CITIES
} from './appActions';

export interface AppReducerState {
  autocompleteSearch: {
    id: string,
    name: string,
    isFavorite: boolean;
  };
  currentCondition: Array<any>;
  forecast: Array<any>;
  cities: Array<any>;
  favorites: Array<any>;
  toggles: Array<any>;
}

const initialState: AppReducerState = {
  autocompleteSearch: {id: '215854', name: 'Tel Aviv', isFavorite: false},
  currentCondition: [],
  forecast: [],
  cities: [],
  favorites: [],
  toggles: [{
      label: 'Home',
      isSelected: true,
      route: ''
    },
    {
      label: 'Favorites',
      isSelected: false,
      route: 'favorites'
    }]
}

export function reducer(state = initialState, action): AppReducerState {
  switch (action.type) {
    case ACTION_AUTOCOMPLETE_SEARCH:
        return {
          ...state,
          autocompleteSearch: action.payload
        };
        break;
    case ACTION_CURRENT_CONDITION:
      return {
        ...state,
        currentCondition: action.payload
      };
      break;
    case ACTION_FORECAST:
      return {
        ...state,
        forecast: action.payload
      };
      break;
    case ACTION_UPDATE_CITIES:
      return {
        ...state,
        cities: action.payload
      };
      break;
    case ACTION_ADD_FAVORITE:
      const updatedFavorites = state.favorites;
      updatedFavorites.push(state.autocompleteSearch)
      return {
        ...state,
        favorites: updatedFavorites
      };
      break;
    case ACTION_REMOVE_FAVORITE:
      const updatesFavorites = state.favorites.filter((item: any) => {
        return item.id !== state.autocompleteSearch.id;
      });
      return {
        ...state,
        favorites: updatesFavorites
      };
      break;
    case ACTION_CHANGE_TOGGLE:
      const oppositePosition = Math.abs(action.payload - 1);
      state.toggles[action.payload].isSelected = true;
      state.toggles[oppositePosition].isSelected = false;
      return {
        ...state,
        toggles: state.toggles
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
