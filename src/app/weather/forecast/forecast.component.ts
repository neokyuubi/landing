import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { openWeatherFinalData, WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecastData! :openWeatherFinalData[];

  constructor(private weather:WeatherService) { }

  ngOnInit(): void 
  {
    this.weather.getForecaast()
    .subscribe(
      forecastData => 
      {
        this.forecastData = forecastData;
      }
    );
  }

}
