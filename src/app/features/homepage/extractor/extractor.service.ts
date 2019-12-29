import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractorService {

  constructor() { }

  public getMetricValue(object: object): any {
    try {
      return object[0].Temperature.Metric.Value;
    } catch {
      return '';
    }
  }

  public getMetricUnit(object: object): any {
    try {
      return object[0].Temperature.Metric.Unit;
    } catch {
      return '';
    }
  }

  public getWeatherText(object: object): any {
    try {
      return object[0].WeatherText;
    } catch {
      return '';
    }
  }

  public getWeatherIcon(object: object): any {
    try {
      return object[0].WeatherIcon;
    } catch {
      return '';
    }
  }

  public getForecastValue(object: any): any {
    try {
      return object.Temperature.Maximum.Value;
    } catch {
      return '';
    }
  }

  public getForecastUnit(object: any): any {
    try {
      return object.Temperature.Maximum.Unit;
    } catch {
      return '';
    }
  }

  public getForecastIcon(object: any): any {
    try {
      return object.Day.Icon;
    } catch {
      return '';
    }
  }

  public getForecastText(object: any): any {
    try {
      return object.Day.IconPhrase;
    } catch {
      return '';
    }
  }
}
