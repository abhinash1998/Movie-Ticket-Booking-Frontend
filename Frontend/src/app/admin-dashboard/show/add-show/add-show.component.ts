import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CityService } from 'src/app/Services/city.service';
import { MovieService } from 'src/app/Services/movie.service';
import { ShowService } from 'src/app/Services/show.service';
import { TheatreService } from 'src/app/Services/theatre.service';

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

  constructor(private fb:FormBuilder, private movieContext:MovieService,
     private theatreContext:TheatreService, private showContext:ShowService, private cityContext:CityService) {

    this.showForm = this.fb.group({
      showDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      movieName: ['', [Validators.required]],
      theatreName: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    // this.getTheatres();
    this.getAllCities();
  }

  // getTheatres() {
  //   this.theatreContext.getTheatres().pipe(takeWhile(() => this.showActionIsActive)).subscribe(
  //     {
  //       next: (res) =>{  
  //         this.theatresDisplay = res.result;
  //       },
  //       error: (error) => console.log(error)
  //     })
  // }
  
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

      this.theatreContext.getTheatreNameByCity(this.selectedCity).pipe(takeWhile(() => this.showActionIsActive)).subscribe(
        {
          next: (res) =>{  
            this.theatresDisplay = res.result;
          },
          error: (error) => console.log(error)
        })   
  }


  addShow(){
    this.showContext.addShow(this.showForm.value)
      .pipe(takeWhile(() => this.showActionIsActive)).subscribe(
        {
          next: () =>{
            window.location.reload();
          },
          error: (error) => console.log(error)
        })
  }

  ngOnDestroy() {
    this.showActionIsActive = false
  }
}
