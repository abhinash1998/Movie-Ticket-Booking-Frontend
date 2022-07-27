import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
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
  showDisplay: any;
  showDates: any = []
  s1: any = []
  constructor(private route: ActivatedRoute, private showContext: ShowService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'],
        this.cityName = params['cityName']
    }
    )
    this.getShowDatesByMovieIdAndCityName(this.movieId, this.cityName)
  }

  getShowDatesByMovieIdAndCityName(movieId: string, cityName: string) {
    this.showContext.getShowDatesByMovieIdAndCityName(movieId, cityName).pipe(takeWhile(() => this.theatreActionIsActive)).subscribe(res => {
      this.showDates = res.result;
      console.log(this.showDates)

    })
  }

  clickCard(value: any) {
    this.showContext.showCinemaHallsByMovieIdAndShowDate(this.movieId, this.cityName, value)
      .pipe(takeWhile(() => this.theatreActionIsActive))
      .subscribe(res => {
        this.showDisplay = res.result;
        console.log(this.showDisplay)
        const unique = [...new Set(this.showDisplay.map((item: any) => item.theatres.theatreName))];
        this.s1 = [];

        unique.forEach(e => {
          let s = this.showDisplay.filter((res: any) => res.theatres.theatreName === e)
            .map((item: any) => ({ option: item.startTime, value: item.startTime }));
          this.s1.push(
            {
              cinemaHall: e,
              startDate: s
            }
          )
        });

      })
  }
  ngOnDestroy() {
    this.theatreActionIsActive = false
  }

}
