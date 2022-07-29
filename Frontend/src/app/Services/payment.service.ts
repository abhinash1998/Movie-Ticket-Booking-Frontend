import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private http:HttpClient) { }

  makePayment(stripeToken: any): Observable<any>{
    console.log(stripeToken)
    return this.http.post<any>(`${environment.baseUrl}/createPayment`, {token: stripeToken});
  }
}
