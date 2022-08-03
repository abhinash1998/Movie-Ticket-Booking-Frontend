import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICinema } from '../Interfaces/ICinema.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) { }

  addNewCinema(cinema: ICinema): Observable<ICinema> {

    return this.http.post<ICinema>(`${environment.baseUrl}/createNewCinema`, cinema);
  }

  showCinema(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showCinema`);
  }

  getCinemaNameByCity(cityName: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cityName", cityName);
    return this.http.get(`${environment.baseUrl}/getCinemaNameByCity`, { params: queryParams });
  }

}
