import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private http:HttpClient) { }

  makePayment(email:any, amount:any): Observable<any>{
    const  paymentData = {email,amount};
    return this.http.post<any>(`${environment.baseUrl}/createPayment`, paymentData);
  }
}
