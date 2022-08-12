import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendEmail(emailBody:any, emailId:any): Observable<any>{

    const emailData = {emailBody, emailId};
    return this.http.post<any>(`${environment.baseUrl}/sendEmail`, emailData);
  }
}
