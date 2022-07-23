import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  addShow(showDate: Date, startTime: Date, endTime: Date, title: String, theatreName: String): Observable<any> {

    const showData = {
      showDate, startTime, endTime, title, theatreName
    };

    return this.http.post<any>(`${environment.baseUrl}/createNewShow`, showData);
  }

  getAllShows(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/getAllShows`);
  }
}
