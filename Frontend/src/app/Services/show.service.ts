import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShow } from '../Interfaces/IShow.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  public showSubject = new BehaviorSubject<any>({ movieId: "", cityName: "", 
  showDate: "", startTime: "", theatreName: "" });
  
  constructor(private http: HttpClient) { }

  createShow(show: IShow): Observable<IShow> {

    return this.http.post<IShow>(`${environment.baseUrl}/addNewShow`, show);
  }

  getShow(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/getAllShows`);
  }

  showCinemaHallsAndStartTimeByMovieIdAndShowDate(movieId: string, cityName: string, showDate: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("movieId", movieId);
    queryParams = queryParams.append("cityName", cityName);
    queryParams = queryParams.append("showDate", showDate);
    return this.http.get(`${environment.baseUrl}/showCinemaHallsAndStartTimeByMovieIdAndShowDate`,
      { params: queryParams });
  }

  getShowDatesByMovieIdAndCityName(movieId: string, cityName: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("movieId", movieId);
    queryParams = queryParams.append("cityName", cityName);
    return this.http.get(`${environment.baseUrl}/getShowDatesByMovieIdAndCityName`,
      { params: queryParams });
  }

  

}
