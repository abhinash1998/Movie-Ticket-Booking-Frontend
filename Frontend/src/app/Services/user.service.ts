import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthenticationUser } from '../Interfaces/IAuthenticationUser';
import { IUser } from '../Interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public userSubject = new BehaviorSubject<any>({onChange:false,selectedCity:""}); 
  public user!: Observable<IUser>;

  constructor(private http:HttpClient) { 
   
      // this.user = this.userSubject.asObservable();
  }

//  public  get  userValue(){
//      return  this.userSubject.value;
//   }

  
  register(user: IUser): Observable<IUser> {

    return this.http.post<IUser>(`${environment.baseUrl}/user/register`, user);
  }

  login(login: IAuthenticationUser): Observable<IAuthenticationUser> {

    return this.http.post<IAuthenticationUser>(`${environment.baseUrl}/user/login`, login);
  }


}
