import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITheatre } from '../Interfaces/ITheatre.interface';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http: HttpClient) { }

  addNewTheatre(theatre:ITheatre): Observable<ITheatre> {

    return this.http.post<ITheatre>(`${environment.baseUrl}/createNewTheatre`, theatre);
  }

  getTheatres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showTheatres`);
  }

}
