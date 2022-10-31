import { Injectable } from '@angular/core';
import { filter, map, mergeMap, Observable, of, pluck, share, switchMap, toArray } from 'rxjs';
import {HttpParams, HttpClient} from '@angular/common/http';

interface openWeatherResponse
{
  list:{
    dt_txt:string,
    main:{
      temp:number
    }
  }[],
}

export interface openWeatherFinalData
{
  dateString: string,
  temp:number
}

@Injectable({
  providedIn: 'root'
})


export class WeatherService {

  private url = "https://api.openweathermap.org/data/2.5/forecast";

  constructor(private http:HttpClient) { }

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
      }),
      switchMap(params =>
      {
        return this.http.get<openWeatherResponse>(this.url, {params})
      }),
      pluck('list'),
      mergeMap((value)=> 
      {
        return of(...value);
      }),
      filter((value, index)=>
      {
        return index % 8 == 0;
      }),
      map(value =>
      {
        return{
          dateString: value.dt_txt,
          temp: value.main.temp
        };
      }),
      toArray(),
      share()
    );
  }

}
