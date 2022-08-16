import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { MovieService } from 'src/app/Services/movie.service';
import { ShowService } from 'src/app/Services/show.service';

@Component({
  selector: 'app-cinema-hall-by-movie-name',
  templateUrl: './cinema-hall-by-movie-name.component.html',
  styleUrls: ['./cinema-hall-by-movie-name.component.css']
})
export class CinemaHallByMovieNameComponent implements OnInit {
  movieId!: string;
  cityName!: string;
  theatreActionIsActive: boolean = true
  newDate: any;
  showDate!: string;
  showDisplay: any;
  cinemaHallName!: string;
  showDateTime!: Date;
  showDates: any = [];
  cinema: any;
  cinemaHallByShowDate: any = [];
  showTime!: Date;
  distinctTheatreName: any;
  filterCinemaHallByStartTime: any;
  movieDetails: any;
  error: boolean = false;
  errorMessage!: string;
  selectedShowDate: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private showContext: ShowService, private movieContext: MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'],
        this.cityName = params['cityName']
    }
    )
    this.getMovieDetails(this.movieId);
    this.getShowDatesByMovieIdAndCityName(this.movieId, this.cityName);
  }

  getMovieDetails(movieId: string) {

    this.movieContext.getMovieById(movieId).pipe(takeWhile(() => this.theatreActionIsActive)).subscribe({
      next: (res) => {
        this.movieDetails = res.result;
      },
      error: (error) => console.log(error)
    })
  }

  getShowDatesByMovieIdAndCityName(movieId: string, cityName: string) {
    this.showContext.getShowDatesByMovieIdAndCityName(movieId, cityName).pipe(takeWhile(() => this.theatreActionIsActive))
      .subscribe(
        {
          next: (res) => {
            this.showDates = res.result;
          },
          error: (error) => {
            this.error = true;
            this.errorMessage = error.error.message
          }
        })
  }

  onChange() {

    this.showDate = new Date(this.selectedShowDate).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    this.showDateTime = this.selectedShowDate
    this.showContext.showCinemaHallsAndStartTimeByMovieIdAndShowDate(this.movieId, this.cityName, this.selectedShowDate)
      .pipe(takeWhile(() => this.theatreActionIsActive))
      .subscribe(
        {
          next: (res) => {
            this.showDisplay = res.result;
            this.distinctTheatreName = [...new Set(this.showDisplay.map((res: any) => res.cinemaId.cinemaName))];
            this.cinemaHallByShowDate = [];

            this.distinctTheatreName.forEach((theatre: any) => {
              this.filterCinemaHallByStartTime = this.showDisplay.filter((res: any) => res.cinemaId.cinemaName === theatre)
                .map((item: any) => (
                  {
                    startTime: item.startTime,
                    cinemaHallName: item.cinemaHallId.cinemaHallName,
                    totalSeats: item.cinemaHallId.totalSeats
                  }));

              this.cinemaHallByShowDate.push(
                {
                  cinemaHall: theatre,
                  details: this.filterCinemaHallByStartTime
                }
              )
            });
          },
          error: (error) => console.log(error)
        })
  }

  navigateToSeatLayoutPage(cinemaHallName: string, cinemaName: string, totalSeats: number, startTime: Date,) {
    this.showContext.showSubject.next({
      movieId: this.movieId,
      cityName: this.cityName,
      showDate: this.showDateTime,
      startTime: startTime,
      cinemaName: cinemaName,
      cinemaHallName: cinemaHallName,
      totalSeats: totalSeats,
    })
    this.cinema = cinemaName.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
    this.showDate = this.showDate.replace(/[^A-Z0-9]+/ig, "-");

    this.router.navigate([`/user/seatlayout/${this.movieId}/${this.cityName}/${this.cinema}/${this.showDate}`])
  }

  ngOnDestroy() {
    this.theatreActionIsActive = false;
  }

}
