import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/Services/payment.service';
import { BookingService } from 'src/app/Services/booking.service';
import { EmailService } from 'src/app/Services/email.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;

  description: any;
  userFullName: any;
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,
    private paymentContext: PaymentService, private bookingContext: BookingService,
    private router: Router, private emailContext: EmailService) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  ngOnInit(): void {
    this.bookingContext.bookingSubject.subscribe(
      {
        next: (res) => {
          this.description = res;
        },
        error: (error) => console.log(error)
      })
    this.userFullName = localStorage.getItem('loggedUser');
  }

  makePayment() {

    if (this.userFullName == null)
      this.router.navigate(['/user/login']);
    else {
      this.stripeService
        .createToken(this.card.element, this.paymentForm.value)
        .subscribe((result) => {
          if (result.token) {
            this.paymentContext.makePayment(result.token, this.description.amount).subscribe((data: any) => {
              console.log(data.result.email)
              if (data.status == true) {
                this.bookingContext.createBooking(this.description).subscribe(
                  {
                    next: () => {
                      this.router.navigate(['/user/show-ticket']);
                    },
                    error: (error) => console.log(error)
                  })

                this.emailContext.sendEmail(this.description, data.result.email).subscribe({
                  next: (res) => {
                    console.log(res)
                  },
                  error: (error) => console.log(error)
                })
              }
            })
          }
        });
    }

  }
}