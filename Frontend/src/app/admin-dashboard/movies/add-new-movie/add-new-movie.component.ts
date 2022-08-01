import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/Services/movie.service';
import { takeWhile } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.css']
})
export class AddNewMovieComponent implements OnInit {
  safeUrl: any;
  movieForm: FormGroup;
  movieActionIsActive: boolean = true;
  moviesDisplay: any = []
  constructor(private fb: FormBuilder, private movieContext: MovieService,
    private router: Router) {
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
      imagePath: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.movieContext.getMovies().pipe(takeWhile(() => this.movieActionIsActive)).subscribe(res => {
      this.moviesDisplay = res.result;
    })
  }

  uploadBanner($event: any) {
    const file: File = $event.target.files[0]
    this.movieForm.patchValue({ imagePath: file });
  }

  addNewMovie() {
    this.movieContext.addMovie(this.movieForm.value)
      .pipe(takeWhile(() => this.movieActionIsActive)).subscribe(() => {
        this.router.navigate(['/TicketBooking/movies']);
      })
  }

  ngOnDestroy() {
    this.movieActionIsActive = false
  }

}
