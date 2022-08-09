import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { CinemaHallService } from 'src/app/Services/cinema-hall.service';
import { AddCinemaHallComponent } from './add-cinema-hall/add-cinema-hall.component';

@Component({
  selector: 'app-cinema-hall',
  templateUrl: './cinema-hall.component.html',
  styleUrls: ['./cinema-hall.component.css']
})
export class CinemaHallComponent implements OnInit {

  cinemaActionIsActive: boolean = true;
  displayedColumns: string[] = ['cinemaHallName', 'totalSeats', 'cinemaName'];
  cinemaHallDisplay = new MatTableDataSource([]);
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cinemaHallContext: CinemaHallService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.showCinemaHall();
  }

  showCinemaHall() {
    this.cinemaHallContext.showCinemaHall().pipe(takeWhile(() => this.cinemaActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.cinemaHallDisplay.data = res.result;
          this.length = this.cinemaHallDisplay.data.length;
        },
        error: (error) => console.log(error)
      })
  }
  
  openDialog() {
    this.dialog
      .open(AddCinemaHallComponent)
      .afterClosed()
      .subscribe((confirm: any) => {
        window.location.reload();
      });
  }
  ngAfterViewInit() {
    this.cinemaHallDisplay.paginator = this.paginator;
    this.cinemaHallDisplay.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cinemaHallDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.cinemaActionIsActive = false
  }

}
