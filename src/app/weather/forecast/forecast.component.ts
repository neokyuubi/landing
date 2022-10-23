import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private weather:WeatherService) { }

  ngOnInit(): void 
  {
    this.weather.getCurrentLocation()
    
    .subscribe(
      result => {
        console.log("coordinates", result);
      }
      ,
      (errors:GeolocationPositionError) => {
        console.log("errors", errors.message);
      }
    );
  }

}
