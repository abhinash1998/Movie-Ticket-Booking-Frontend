import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITheatre } from '../Interfaces/Itheatre.interface';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http: HttpClient) { }

  addNewTheatre(theatreName: String, theatreLocation: String, totalSeats: Number): Observable<ITheatre> {

      const theatreData = {
        theatreName, theatreLocation, totalSeats
      };

    return this.http.post<ITheatre>(`${environment.baseUrl}/createNewTheatre`, theatreData);
  }

  getTheatres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showTheatres`);
  }

}
