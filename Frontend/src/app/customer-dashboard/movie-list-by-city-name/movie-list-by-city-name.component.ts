import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { CityService } from 'src/app/Services/city.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-movie-list-by-city-name',
  templateUrl: './movie-list-by-city-name.component.html',
  styleUrls: ['./movie-list-by-city-name.component.css']
})
export class MovieListByCityNameComponent implements OnInit {
  moviesDisplay: any = [];
  movieActionIsActive: boolean = true;
  selectedCity: any;
 
  constructor(private cityContext: CityService) { }

  ngOnInit(): void {
    this.cityContext.citySelection.subscribe(
      {
        next: () =>{
          this.selectedCity =  localStorage.getItem('selectedCity');
          this.getMoviesByCityName(this.selectedCity)
        },
        error: (error) => console.log(error)
      })
  }

  getMoviesByCityName(cityName: string) {
    this.cityContext.getMoviesByCityName(cityName).pipe(takeWhile(() => this.movieActionIsActive)).subscribe(
      {
        next: (res) =>{
          this.moviesDisplay = res.result
        },
        error: (error) => console.log(error)
      })
  }

  ngOnDestroy() {
    this.movieActionIsActive = false;
  }
}
