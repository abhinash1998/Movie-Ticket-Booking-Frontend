import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { TheatreService } from 'src/app/Services/theatre.service';
import { AddNewTheatreComponent } from './add-new-theatre/add-new-theatre.component';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit {

  theatreActionIsActive: boolean = true;
  displayedColumns: string[] = ['theatreName', 'theatreLocation', 'totalSeats'];
  theatresDisplay = new MatTableDataSource([]);
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private theatreContext: TheatreService, public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getTheatres();
  }

  getTheatres() {
    this.theatreContext.getTheatres().pipe(takeWhile(() => this.theatreActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.theatresDisplay.data = res.result;
          this.length = this.theatresDisplay.data.length;
        },
        error: (error) => console.log(error)
      })
  }
  
  openDialog() {
    this.dialog
      .open(AddNewTheatreComponent)
      .afterClosed()
      .subscribe((confirm: any) => {
        window.location.reload();
      });
  }
  ngAfterViewInit() {
    this.theatresDisplay.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.theatreActionIsActive = false
  }

}
