import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  previousUrl!: string;
  loginForm: FormGroup;
  loginActionIsActive: boolean = true;
  error: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private userContext: UserService,
    private router: Router, private _location: Location) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.userContext.login(this.loginForm.value)
      .pipe(catchError(e => of(e.error)))
      .subscribe(res => {
        if (res.status != 200) {
          this.error = true;
          this.errorMessage = res.message
        }
        else if (res.result.role == 'admin') {
          localStorage.setItem('loggedUser', res.result.fullName);
          localStorage.setItem('customerId', res.result._id);
          localStorage.setItem('isLogin', 'true');
          this.router.navigate(['/TicketBooking/dashboard']);
        }
        else {
          localStorage.setItem('loggedUser', res.result.fullName);
          localStorage.setItem('customerId', res.result._id);
          localStorage.setItem('isLogin', 'true');
          this._location.back();
        }



      })
  }

  ngOnDestroy() {
    this.loginActionIsActive = false;
  }

}
