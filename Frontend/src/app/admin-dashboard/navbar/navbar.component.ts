import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userFullName:any='';
  login:any='';

  constructor() { }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem('loggedUser');
    this.login = localStorage.getItem('isLogin');
  }

  logOutAdmin(){
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLogin');
  }

}
