import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  newDate:any;
  showDate!: string;
  showDisplay: any;
  cinemaHallName!: string;
  showDateTime!: Date;
  showDates: any = []
  cinemaHallByShowDate: any = []
  showTime!: Date;
  distinctTheatreName:any;
  filterCinemaHallByStartTime:any;

  constructor(private route: ActivatedRoute, private router:Router, private showContext: ShowService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'],
        this.cityName = params['cityName']
    }
    )
    this.getShowDatesByMovieIdAndCityName(this.movieId, this.cityName)
  }

  getShowDatesByMovieIdAndCityName(movieId: string, cityName: string) {
    this.showContext.getShowDatesByMovieIdAndCityName(movieId, cityName).pipe(takeWhile(() => this.theatreActionIsActive))
    .subscribe(
      {
        next: (res) =>{  
          this.showDates = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  clickCard(value: any) {
    this.showDate = new Date(value).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    this.showDateTime = value
    this.showContext.showCinemaHallsByMovieIdAndShowDate(this.movieId, this.cityName, value)
      .pipe(takeWhile(() => this.theatreActionIsActive))
      .subscribe(
        {
          next: (res) =>{  
            this.showDisplay = res.result;
            this.distinctTheatreName = [...new Set(this.showDisplay.map((res: any) => res.theatres.theatreName))];
           this.cinemaHallByShowDate = [];
   
           this.distinctTheatreName.forEach((theatre:any) => {
            this.filterCinemaHallByStartTime= this.showDisplay.filter((res: any) => res.theatres.theatreName === theatre)
               .map((item: any) => ({ option: item.startTime, value: item.startTime }));

             this.cinemaHallByShowDate.push(
               {
                 cinemaHall: theatre,
                 startDate: this.filterCinemaHallByStartTime
               }
             )
           });
          },
          error: (error) => console.log(error)
        })
  }

  navigateToSeatLayoutPage(theatreName:string, startTime:Date){
    this.showContext.showSubject.next({
      movieId: this.movieId,
      cityName: this.cityName,
      showDate: this.showDateTime,
      startTime: startTime,
      theatreName: theatreName
    })
   this.cinemaHallName = theatreName.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
   this.showDate = this.showDate.replace(/[^A-Z0-9]+/ig, "-");

    this.router.navigate([`/user/seatlayout/${this.movieId}/${this.cityName}/${this.cinemaHallName}/${this.showDate}`])
  }
  ngOnDestroy() {
    this.theatreActionIsActive = false
  }

}
