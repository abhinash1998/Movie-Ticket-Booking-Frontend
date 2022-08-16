import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CinemaService } from 'src/app/Services/cinema.service';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  cinemaForm: FormGroup;
  cinemaActionIsActive: boolean = true;
  cityDisplay: any;

  constructor(private fb: FormBuilder, private cinemaContext: CinemaService,
     private cityContext: CityService) {
    this.cinemaForm = this.fb.group({
      cinemaName: ['', [Validators.required]],
      cinemaLocation: ['', [Validators.required]],
      totalCinemaHalls: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.cinemaActionIsActive)).subscribe(
      {
        next: (res) => {
          this.cityDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  addNewCinema() {
    this.cinemaContext.addNewCinema(this.cinemaForm.value)
      .pipe(takeWhile(() => this.cinemaActionIsActive)).subscribe(
        {
          next: () => {
            window.location.reload();
          },
          error: (error) => console.log(error)
        })
  }

  ngOnDestroy() {
    this.cinemaActionIsActive = false;
  }

}
