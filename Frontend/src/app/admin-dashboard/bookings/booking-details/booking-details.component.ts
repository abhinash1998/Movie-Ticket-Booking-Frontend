import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  bookingActionIsActive:boolean = true;
  bookingId!: string;
  bookingDetails:any;
  constructor(private bookingContext:BookingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = params['bookingId']
    }
    );
    this.getBookingDetailsById(this.bookingId)
  }

  getBookingDetailsById(bookingId1: string) {
    this.bookingContext.getBookingDetailsById(bookingId1).pipe(takeWhile(() => this.bookingActionIsActive))
      .subscribe({
        next: (res) => {
          this.bookingDetails = res.result;
          console.log(res.result)
        },
        error: (error) => console.log(error)
      })

  }

  ngOnDestroy() {
    this.bookingActionIsActive = false;
  }

}
