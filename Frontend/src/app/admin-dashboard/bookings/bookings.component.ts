import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  displayedColumns: string[] = ['movieName', 'fullName',
  'timeStamp','action'];
  bookingDisplay = new MatTableDataSource([]);
  bookingActionIsActive: boolean = true;
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];
  customerId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private bookingContext: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingContext.getBookings().pipe(takeWhile(() => this.bookingActionIsActive)).subscribe({
      next: (res) =>{
        this.bookingDisplay.data = res.result;
        this.length = this.bookingDisplay.data.length;
      },
      error: (error) => console.log(error)
    })
  }

  ngAfterViewInit() {
    this.bookingDisplay.paginator = this.paginator;
    this.bookingDisplay.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookingDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.bookingActionIsActive = false;
  }

}
