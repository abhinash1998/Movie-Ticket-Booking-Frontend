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
    this.getMovies();
    this.getTheatres();
    this.getAllCities();
  }

  getMovies() {
    this.movieContext.getMovies().pipe(takeWhile(() => this.showActionIsActive)).subscribe(res => {
      this.moviesDisplay = res.result;
    })
  }

  getTheatres() {
    this.theatreContext.getTheatres().pipe(takeWhile(() => this.showActionIsActive)).subscribe(res => {
      this.theatresDisplay = res.result;
    })
  }
  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.showActionIsActive)).subscribe(res => {
      this.cityDisplay = res.result;

    })
  }

  addShow(){
    this.showContext.addShow(this.showForm.value)
      .pipe(takeWhile(() => this.showActionIsActive)).subscribe(() => {
        window.location.reload();
      })
  }

  ngOnDestroy() {
    this.showActionIsActive = false
  }
}
