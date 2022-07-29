import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooking } from '../Interfaces/IBooking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  createBooking(booking: IBooking): Observable<IBooking> {

    return this.http.post<IBooking>(`${environment.baseUrl}/createBooking`, booking);
  }
}
