import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { IBooking } from 'src/app/Interfaces/IBooking.interface';
import { BookingService } from 'src/app/Services/booking.service';
import { MovieService } from 'src/app/Services/movie.service';
import { ShowService } from 'src/app/Services/show.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {

  columnNumber: any = [];
  rowNumber: any = [];
  convertNumberToAlphabet!: number;
  theatreDetails: any;
  seatLayoutActionIsActive: boolean = true;
  columns: number = 10;
  rows: any;
  description: any;
  movieDetails: any;
  storedSeats: any = [];
  customerId: any;
  booking!: IBooking;

  constructor(private showContext: ShowService, private movieContext: MovieService,
    private bookingContext: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.showContext.showSubject.subscribe(
      {
        next: (res) => {
          this.description = res;
        },
        error: (error) => console.log(error)
      })

    this.getSeats(this.description.totalSeats);
    this.getMovieDetails(this.description.movieId);
  }

  getMovieDetails(movieId: string) {
    this.movieContext.getMovieById(movieId).pipe(takeWhile(() => this.seatLayoutActionIsActive)).subscribe(
      {
        next: (res) => {
          this.movieDetails = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  getSeats(totalSeats: number) {

    this.rows = totalSeats / 10;

    for (let i = 0; i < this.rows; i++) {
      this.convertNumberToAlphabet = i + 65;
      this.rowNumber.push({ value: String.fromCharCode(this.convertNumberToAlphabet) });
    }

    for (let j = 0; j < this.columns; j++) {
      this.columnNumber.push({ value: j + 1 });
    }

  }

  confirmAndPay() {


    this.bookingContext.bookingSubject.next({
      status: 1,
      numberOfSeats: this.storedSeats.length,
      seats: this.storedSeats + "",
      amount: 100 * this.storedSeats.length,
      customerId: this.customerId,
      showDate: this.description.showDate,
      startTime: this.description.startTime,
      cinemaName: this.description.cinemaName,
      cinemaHallName: this.description.cinemaHallName,
      movieName: this.movieDetails.title
    })
    this.router.navigate(['/user/checkout']);

  }

  onSelected(selectedSeats: any) {
    this.storedSeats.push(selectedSeats);
  }

  ngOnDestroy() {
    this.seatLayoutActionIsActive = false;
  }

}
