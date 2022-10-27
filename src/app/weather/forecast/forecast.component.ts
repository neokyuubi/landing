import { Component, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { openWeatherFinalData, WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecastData:Observable<{dateString: string, temp: number}[]>;

  constructor(public weather:WeatherService) {this.forecastData = this.weather.getForecaast()}

  ngOnInit(): void 
  {
  }

}
