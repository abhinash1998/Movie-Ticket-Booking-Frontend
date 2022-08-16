import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/Services/movie.service';
import { takeWhile } from 'rxjs';
import { Router } from '@angular/router';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.css']
})
export class AddNewMovieComponent implements OnInit {
  safeUrl: any;
  movieForm: FormGroup;
  movieActionIsActive: boolean = true;
  moviesDisplay: any = [];
  cityDisplay: any;

  constructor(private fb: FormBuilder, private movieContext: MovieService,
    private router: Router, private cityContext: CityService) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      cast: ['', [Validators.required]],
      director: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      language: ['', [Validators.required]],
      trailerLink: ['', [Validators.required]],
      durationInMins: ['', [Validators.required]],
      format: [''],
      imagePath: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAllCities();
    this.movieContext.getMovies().pipe(takeWhile(() => this.movieActionIsActive)).subscribe(
      {
        next: (res) => {
          this.moviesDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  uploadBanner($event: any) {
    const file: File = $event.target.files[0]
    this.movieForm.patchValue({ imagePath: file });
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.movieActionIsActive)).subscribe(
      {
        next: (res) => {
          this.cityDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  addNewMovie() {

    this.movieContext.addMovie(this.movieForm.value)
      .pipe(takeWhile(() => this.movieActionIsActive)).subscribe(
        {
          next: () => {
            this.router.navigate(['/TicketBooking/movies']);
          },
          error: (error) => console.log(error)
        })
  }

  ngOnDestroy() {
    this.movieActionIsActive = false;
  }

}
