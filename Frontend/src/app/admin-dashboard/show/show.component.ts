import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { ShowService } from 'src/app/Services/show.service';
import { AddShowComponent } from './add-show/add-show.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  showActionIsActive: boolean = true;
  displayedColumns: string[] = ['showDate', 'startTime', 'endTime', 'title', 'cinemaName','cinemaHallName','cityName'];
  showDisplay = new MatTableDataSource([]);
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private showContext:ShowService) { }

  ngOnInit(): void {
    this.getShow();
  }

  getShow() {
    this.showContext.getShow().pipe(takeWhile(() => this.showActionIsActive)).subscribe(
      {
        next: (res) =>{  
          this.showDisplay.data = res.result;
          this.length = this.showDisplay.data.length;
        },
        error: (error) => console.log(error)
      })
  }

  ngAfterViewInit() {
    this.showDisplay.paginator = this.paginator;
    this.showDisplay.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.showDisplay.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog
      .open(AddShowComponent)
      .afterClosed()
      .subscribe((confirm: any) => {
        window.location.reload();
      });
  }

  ngOnDestroy() {
    this.showActionIsActive = false;
  }

}
