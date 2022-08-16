import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { CinemaService } from 'src/app/Services/cinema.service';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  cinemaActionIsActive: boolean = true;
  displayedColumns: string[] = ['cinemaName', 'cinemaLocation', 'totalCinemaHalls'];
  cinemaDisplay = new MatTableDataSource([]);
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cinemaContext: CinemaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.showCinema();
  }

  showCinema() {
    this.cinemaContext.showCinema().pipe(takeWhile(() => this.cinemaActionIsActive)).subscribe(
      {
        next: (res) => {
          this.cinemaDisplay.data = res.data.result;
          this.length = this.cinemaDisplay.data.length;
        },
        error: (error) => console.log(error)
      })
  }

  openDialog() {
    this.dialog
      .open(AddCinemaComponent)
      .afterClosed()
      .subscribe((confirm: any) => {
        window.location.reload();
      });
  }

  ngAfterViewInit() {
    this.cinemaDisplay.paginator = this.paginator;
    this.cinemaDisplay.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cinemaDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.cinemaActionIsActive = false;
  }
}
