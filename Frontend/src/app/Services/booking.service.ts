import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBooking } from '../Interfaces/IBooking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public bookingSubject = new BehaviorSubject<any>({
    status: 0, numberOfSeats: 0,
    amount: 0, customerId: "", showDate: "", startTime: "", cinemaName: "",
    cinemaHallName: "", movieName: ""
  });

  createBooking(booking: IBooking): Observable<IBooking> {

    return this.http.post<IBooking>(`${environment.baseUrl}/createBooking`, booking);
  }

  getBookingByUserId(userId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);

    return this.http.get(`${environment.baseUrl}/getBookingByUserId`,
      { params: queryParams });
  }

  getBookingDetailsById(bookingId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("bookingId", bookingId);

    return this.http.get(`${environment.baseUrl}/getBookingDetailsById`,
      { params: queryParams });
  }

  getLatestBookingByUserId(userId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);

    return this.http.get(`${environment.baseUrl}/getLatestBookingByUserId`,
      { params: queryParams });
  }

  getBookings(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/getBookings`);
  }
}
