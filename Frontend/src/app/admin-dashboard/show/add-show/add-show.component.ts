import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CinemaHallService } from 'src/app/Services/cinema-hall.service';
import { CinemaService } from 'src/app/Services/cinema.service';
import { CityService } from 'src/app/Services/city.service';
import { MovieService } from 'src/app/Services/movie.service';
import { ShowService } from 'src/app/Services/show.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

  moviesDisplay:any = [];
  theatresDisplay:any = [];
  cityDisplay:any = [];
  showActionIsActive: boolean = true;
  showForm: FormGroup;
  selectedCity:any;
  selectedCinema:any;
  cinemaDisplay:any;
  cinemaHallDisplay:any;
  error: boolean = false;
  errorMessage!: string;
  
  constructor(private fb:FormBuilder, private showContext:ShowService, 
     private cityContext:CityService, private cinemaContext:CinemaService,
     private cinemaHallContext:CinemaHallService) {


    this.showForm = this.fb.group({
      showDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      movieName: ['', [Validators.required]],
      cinemaName: ['', [Validators.required]],
      cinemaHallName: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    })

   }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.showActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.cityDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  onChange() {
    this.cityContext.getMoviesByCityName(this.selectedCity).pipe(takeWhile(() => this.showActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.moviesDisplay = res.result;
        },
        error: (error) => console.log(error)
      })

          this.cinemaContext.getCinemaNameByCity(this.selectedCity).pipe(takeWhile(() => this.showActionIsActive)).subscribe(
            {
              next: (res) =>{  
                this.cinemaDisplay = res.result;
              },
              error: (error) => console.log(error)
            })
        
  }


  

  selectCinema() {
    this.cinemaHallContext.getCinemaHallByCinemaName(this.selectedCinema).pipe(takeWhile(() => this.showActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.cinemaHallDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
    }

  addShow(){
    this.showContext.createShow(this.showForm.value)
      .pipe(takeWhile(() => this.showActionIsActive)).subscribe(
        {
          next: () =>{
            window.location.reload();
          },
          error: (error) => {
            this.error = true;
            this.errorMessage = error.error.message
          }
        })
  }

  ngOnDestroy() {
    this.showActionIsActive = false
  }
}
