import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CinemaHallService } from 'src/app/Services/cinema-hall.service';
import { CinemaService } from 'src/app/Services/cinema.service';
import { CityService } from 'src/app/Services/city.service';

@Component({
  selector: 'app-add-cinema-hall',
  templateUrl: './add-cinema-hall.component.html',
  styleUrls: ['./add-cinema-hall.component.css']
})
export class AddCinemaHallComponent implements OnInit {

  cinemaHallForm: FormGroup;
  cinemaActionIsActive: boolean = true;
  cinemaDisplay: any;
  cityDisplay: any;

  constructor(private fb: FormBuilder, private cinemaContext: CinemaService,
    private cinemaHallContext: CinemaHallService) {
    this.cinemaHallForm = this.fb.group({
      cinemaHallName: ['', [Validators.required]],
      totalSeats: ['', [Validators.required]],
      cinemaName: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.showCinema();
  }

  showCinema() {
    this.cinemaContext.showCinema().pipe(takeWhile(() => this.cinemaActionIsActive)).subscribe(
      {
        next: (res) => {
          this.cinemaDisplay = res.data.cinemaResult;
        },
        error: (error) => console.log(error)
      })
  }

  addNewCinemaHall() {
    this.cinemaHallContext.addNewCinemaHall(this.cinemaHallForm.value)
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
