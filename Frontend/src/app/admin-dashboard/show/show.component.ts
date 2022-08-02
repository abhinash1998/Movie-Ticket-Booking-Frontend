import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['showDate', 'startTime', 'endTime', 'title', 'theatreName','cityName'];
  showDisplay = new MatTableDataSource([]);
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog, private showContext:ShowService) { }

  ngOnInit(): void {
    this.getAllShows();
  }

  getAllShows() {
    this.showContext.getAllShows().pipe(takeWhile(() => this.showActionIsActive)).subscribe(
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
