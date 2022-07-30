import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { IBooking } from 'src/app/Interfaces/IBooking.interface';
import { BookingService } from 'src/app/Services/booking.service';
import { MovieService } from 'src/app/Services/movie.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { ShowService } from 'src/app/Services/show.service';
import { TheatreService } from 'src/app/Services/theatre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {
  
  columnNumber:any=[]
  rowNumber:any=[]
  convertNumberToAlphabet!: number;
  theatreDetails: any;
  seatLayoutActionIsActive:boolean = true;
  columns:number=10
  rows:any;
  description:any
  movieDetails:any;
  paymentHandler: any = null;
  success: boolean = false;
  failure:boolean = false;
storedSeats:any=[];
customerId:any;
  booking!: IBooking;
  ticketPrice:any;

  constructor(private showContext: ShowService, private theatreContext: TheatreService, 
    private movieContext:MovieService, private paymentContext: PaymentService,
    private bookingContext: BookingService, private router:Router) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.showContext.showSubject.subscribe(res => {
      this.description=res;
    })
   this.getTheatreDetailsByTheatreName(this.description.theatreName);
   this.getMovieDetails(this.description.movieId);
   this.invokeStripe();
  }

  getMovieDetails(movieId: string){
    this.movieContext.getMovieById(movieId).pipe(takeWhile(() => this.seatLayoutActionIsActive)).subscribe(res => {
      this.movieDetails = res.result;     
    })
  }

  getTheatreDetailsByTheatreName(theatreName:string){
    this.theatreContext.getTheatreDetailsByTheatreName(theatreName).
    pipe(takeWhile(() => this.seatLayoutActionIsActive)).subscribe(res => {
      this.theatreDetails = res.result;

      this.rows = this.theatreDetails.totalSeats/10;
     
      for(let i=0;i<this.rows;i++){
       this.convertNumberToAlphabet=i+65;
       this.rowNumber.push({ value: String.fromCharCode(this.convertNumberToAlphabet) })
      }
   
      for(let j=0;j<this.columns;j++){
       this.columnNumber.push({ value: j+1 })
      }
      
    })
  }

  confirmAndPay() {
  
     this.booking ={
      status : 1,
      numberOfSeats: this.storedSeats.length,
      seats: this.storedSeats + "",
      amount: 100 * this.storedSeats.length,
      customerId:  this.customerId,
      theatreName: this.description.theatreName,
      movieName: this.movieDetails.title
    }

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: `${environment.apiKey}`,
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentstripe(stripeToken);
      },
    });
 
    const paymentstripe = (stripeToken: any) => {
      this.paymentContext.makePayment(stripeToken.email,this.booking.amount).subscribe((data: any) => {
        if (data.status == true) {
          this.bookingContext.createBooking(this.booking).subscribe(res=>{
            this.router.navigate(['/user/booking-history']);
          })
        }
        else {
          this.failure = true
        }
      });
    };

     this.ticketPrice = this.booking.amount;

    paymentHandler.open({
      name: this.booking.movieName,
      description: this.description.theatreName,
      amount: this.ticketPrice * 100,
    });
  }
 
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }

  onSelected(selectedSeats:any){
   this.storedSeats.push(selectedSeats);
  }

  ngOnDestroy() {
    this.seatLayoutActionIsActive = false;
  }
 
}
