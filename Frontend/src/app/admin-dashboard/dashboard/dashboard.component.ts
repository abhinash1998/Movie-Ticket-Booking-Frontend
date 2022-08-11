import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { BookingService } from 'src/app/Services/booking.service';
import { CinemaService } from 'src/app/Services/cinema.service';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  moviesDisplay: any = [];
  movieLength!: number;
  cinemaLength!: number;
  bookingLength!: number;
  dashboardActionIsActive: boolean = true;

  constructor(private movieContext: MovieService, private cinemaContext: CinemaService,
    private bookingContext: BookingService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCinemas();
    this.getBookings();
  }

  getMovies() {
    this.movieContext.getMovies().pipe(takeWhile(() => this.dashboardActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.movieLength = res.result.length;
        },
        error: (error) => console.log(error)
      })
  }

  getCinemas() {
    this.cinemaContext.showCinema().pipe(takeWhile(() => this.dashboardActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.cinemaLength = res.data.result.length;
        },
        error: (error) => console.log(error)
      })
  }

  getBookings() {
    this.bookingContext.getBookings().pipe(takeWhile(() => this.dashboardActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.bookingLength = res.result.length;
        },
        error: (error) => console.log(error)
      })
  }


  ngOnDestroy() {
    this.dashboardActionIsActive = false;
  }
}
