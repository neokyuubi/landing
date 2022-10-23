import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getCurrentLocation()
  {
    return new Observable<GeolocationCoordinates>((observer)=>
    {
      window.navigator.geolocation.getCurrentPosition((position)=>
      {
        observer.next(position.coords);
        observer.complete();
      },
      (error)=>
      {
        observer.error(error);
      }
      );
    });
  }

  getForecaast()
  {
    return this.getCurrentLocation().pipe(
      map(coords=> 
      {
        return new HttpParams()
        .set('lat', coords.latitude)
        .set('lon', coords.longitude)
        .set('units', 'metric')
        .set('appid', '51c702366250f92fed9d7349faeea70c');
      })
    )
  }

}
