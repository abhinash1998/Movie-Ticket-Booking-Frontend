import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShow } from '../Interfaces/IShow.interface';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  addShow(show:IShow): Observable<IShow> {

    return this.http.post<IShow>(`${environment.baseUrl}/createNewShow`, show);
  }

  getAllShows(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/getAllShows`);
  }
}
