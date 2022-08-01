import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CityService } from 'src/app/Services/city.service';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  showActionIsActive: boolean = true;
  cityForm: FormGroup;
  moviesDisplay: any = [];

  constructor(private fb: FormBuilder, private movieContext: MovieService, private cityContext: CityService) {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required]],
      state: ['', [Validators.required]],
      movieName: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieContext.getMovies().pipe(takeWhile(() => this.showActionIsActive)).subscribe(res => {
      this.moviesDisplay = res.result;
    })

  }

  addCity() {
    this.cityContext.addCity(this.cityForm.value)
      .pipe(takeWhile(() => this.showActionIsActive)).subscribe(() => {
        window.location.reload();
      })
  }

  ngOnDestroy() {
    this.showActionIsActive = false
  }

}
