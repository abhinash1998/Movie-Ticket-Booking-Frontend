import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, takeWhile } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signUpActionIsActive: boolean = true;
  error: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private userContext: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.userContext.register(this.signUpForm.value)
      .pipe(catchError(e => of(e.error)))
      .subscribe(res => {
        if (res.status == 401) {
          this.error = true;
          this.errorMessage = res.message
        }
        else
          this.router.navigate(['/user/login']);
      })
  }

  ngOnDestroy() {
    this.signUpActionIsActive = false;
  }

}
