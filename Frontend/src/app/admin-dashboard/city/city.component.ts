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
  error: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private movieContext: MovieService, private cityContext: CityService) {
    this.cityForm = this.fb.group({
      cityName: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  addCity() {
    this.cityContext.addCity(this.cityForm.value)
      .pipe(takeWhile(() => this.showActionIsActive)).subscribe(
        {
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            this.error = true;
            this.errorMessage = error.error.message
          }
        })
  }

  ngOnDestroy() {
    this.showActionIsActive = false;
  }
}
