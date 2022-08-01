import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { TheatreService } from 'src/app/Services/theatre.service';


@Component({
  selector: 'app-add-new-theatre',
  templateUrl: './add-new-theatre.component.html',
  styleUrls: ['./add-new-theatre.component.css']
})
export class AddNewTheatreComponent implements OnInit {

  theatreForm: FormGroup;
  theatreActionIsActive: boolean = true;

  constructor(private fb: FormBuilder, private theatreContext: TheatreService) {
    this.theatreForm = this.fb.group({
      theatreName: ['', [Validators.required]],
      theatreLocation: ['', [Validators.required]],
      totalSeats: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
  }

  addNewTheatre() {
    this.theatreContext.addNewTheatre(this.theatreForm.value)
      .pipe(takeWhile(() => this.theatreActionIsActive)).subscribe(() => {
        window.location.reload();
      })
  }

  ngOnDestroy() {
    this.theatreActionIsActive = false
  }

}
