import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICity } from '../Interfaces/ICity.interface';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }


  addCity(city:ICity): Observable<ICity> {

    return this.http.post<ICity>(`${environment.baseUrl}/addCity`, city);
  }

  getAllCities(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showAllCities`);
  }

  getMoviesByCityName(cityName:string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cityName", cityName);
    return this.http.get(`${environment.baseUrl}/getMoviesByCityName`, { params: queryParams });
  }

}
