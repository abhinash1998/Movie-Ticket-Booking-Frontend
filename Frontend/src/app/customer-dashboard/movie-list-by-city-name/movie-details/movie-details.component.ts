import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId!: string;
  cityName!: string;
  math = Math;
  movieActionIsActive: boolean = true;
  movieDetails: any;
  trailerLink!: string;
  userFullName:any=""
  constructor(private route: ActivatedRoute, private movieContext: MovieService, 
    private _sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem('loggedUser');
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'],
        this.cityName = params['cityName']
    }

    );

    this.getMovieDetails(this.movieId)
  }

  getMovieDetails(movieId: string) {

    this.movieContext.getMovieById(movieId).pipe(takeWhile(() => this.movieActionIsActive)).subscribe({
      next: (res) =>     {
        this.movieDetails = res.result;
        this.movieDetails.trailerLink = this._sanitizer.bypassSecurityTrustResourceUrl(this.movieDetails.trailerLink)
      },
      error: (error) => console.log(error)
    })
  }

  convertMinuteToHour(minute: number) {
    var hours = this.math.floor(minute / 60);
    var minutes = minute % 60;
    var duration = hours + "h " + minutes + "m";
    return duration;
  }

  bookTicket(){

   if(this.userFullName == null)
   this.router.navigate(['/user/login']);
   else
  this.router.navigate([`/user/cinema-hall/${this.movieId}/city/${this.cityName}`]);

  }

 

  ngOnDestroy() {
    this.movieActionIsActive = false;
  }
}
