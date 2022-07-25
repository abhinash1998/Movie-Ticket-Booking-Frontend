import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { CityService } from 'src/app/Services/city.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  cityDisplay: any = []
  showActionIsActive: boolean = true
  constructor(private cityContext: CityService, private router: Router, private userContext: UserService) { }
  userFullName: any = '';
  login: any = ''
  selectedCity!: any;
  ngOnInit(): void {
    this.userFullName = localStorage.getItem('loggedUser');
    this.login = localStorage.getItem('isLogin');
    this.getAllCities();
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.showActionIsActive)).subscribe(res => {
      this.cityDisplay = res.result;
    })
  }

  onChange() {
    this.userContext.userSubject.next({ onChange: true, selectedCity: this.selectedCity })
  }
  
  logOutUser() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLogin');
  }

}
