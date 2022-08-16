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

  cityDisplay: any = [];
  showActionIsActive: boolean = true;
  userFullName: any;
  login: any;
  selectedCity!: any;

  constructor(private cityContext: CityService) { }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem('loggedUser');
    this.login = localStorage.getItem('isLogin');
    this.selectedCity = localStorage.getItem('selectedCity');
    this.getAllCities();
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.showActionIsActive)).subscribe(
      {
        next: (res) => {
          this.cityDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  onChange() {
    localStorage.setItem('selectedCity', this.selectedCity);
    this.cityContext.citySelection.next({
      selectedCity: this.selectedCity
    })
  }

  logOutUser() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('customerId');
  }

}
