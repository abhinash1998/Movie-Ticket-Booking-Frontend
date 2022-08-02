import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { CityService } from 'src/app/Services/city.service';
import { TheatreService } from 'src/app/Services/theatre.service';


@Component({
  selector: 'app-add-new-theatre',
  templateUrl: './add-new-theatre.component.html',
  styleUrls: ['./add-new-theatre.component.css']
})
export class AddNewTheatreComponent implements OnInit {

  theatreForm: FormGroup;
  theatreActionIsActive: boolean = true;
  cityDisplay:any;
  constructor(private fb: FormBuilder, private theatreContext: TheatreService, private cityContext:CityService) {
    this.theatreForm = this.fb.group({
      theatreName: ['', [Validators.required]],
      theatreLocation: ['', [Validators.required]],
      totalSeats: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.getAllCities()
  }

  getAllCities() {
    this.cityContext.getAllCities().pipe(takeWhile(() => this.theatreActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.cityDisplay = res.result;
        },
        error: (error) => console.log(error)
      })
  }

  addNewTheatre() {
    this.theatreContext.addNewTheatre(this.theatreForm.value)
      .pipe(takeWhile(() => this.theatreActionIsActive)).subscribe(
        {
          next: () =>{
            window.location.reload();
          },
          error: (error) => console.log(error)
        })
  }

  ngOnDestroy() {
    this.theatreActionIsActive = false
  }

}
