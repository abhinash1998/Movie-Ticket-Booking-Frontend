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

  movieForm: FormGroup;
  movieActionIsActive: boolean = true;

  constructor(private fb: FormBuilder, private movieContext: MovieService, private router: Router) {
    this.movieForm = this.fb.group({
      movieName: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      cast: ['', [Validators.required]],
      director: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      language: ['', [Validators.required]],
      trailerLink: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      format: [''],
      imagePath: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {

  }
  uploadBanner($event: any) {
    const file: File = $event.target.files[0]
    this.movieForm.patchValue({ imagePath: file });
  }

  addNewMovie() {
    this.movieContext.addMovie(this.movieForm.value.movieName, this.movieForm.value.releaseDate,
      this.movieForm.value.cast, this.movieForm.value.director, this.movieForm.value.description,
      this.movieForm.value.genre, this.movieForm.value.language, this.movieForm.value.trailerLink,
      this.movieForm.value.duration, this.movieForm.value.format, this.movieForm.value.imagePath)
      .pipe(takeWhile(() => this.movieActionIsActive)).subscribe(() => {
        this.router.navigate(['/TicketBooking/movies']);
      })
  }

  ngOnDestroy() {
    this.movieActionIsActive = false
  }

}
