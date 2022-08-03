import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICinema } from '../Interfaces/ICinema.interface';
import { ICinemaHall } from '../Interfaces/ICinemaHall.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService {

  constructor(private http: HttpClient) { }

  addNewCinemaHall(cinemaHall: ICinemaHall): Observable<ICinema> {

    return this.http.post<ICinema>(`${environment.baseUrl}/createNewCinemaHall`, cinemaHall);
  }

  showCinemaHall(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showCinemaHall`);
  }

  getCinemaHallByCinemaName(cinemaName: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cinemaName", cinemaName);
    return this.http.get(`${environment.baseUrl}/getCinemaHallByCinemaName`, { params: queryParams });
  }
}
