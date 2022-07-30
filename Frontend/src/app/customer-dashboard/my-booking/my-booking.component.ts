import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {

  displayedColumns: string[] = ['movieName', 'theatreName', 'numberOfSeats', 'seats', 'amount', 'timeStamp'];
  bookingDisplay = new MatTableDataSource([]);
  bookingActionIsActive: boolean = true;
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];
  customerId:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bookingContext: BookingService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    console.log(this.customerId)
    this.getBookingsByUserId(this.customerId)
  }

  getBookingsByUserId(customerId:string) {
    this.bookingContext.getBookingByUserId(customerId).pipe(takeWhile(() => this.bookingActionIsActive)).subscribe(res => {
      this.bookingDisplay.data = res.result;
      this.length = this.bookingDisplay.data.length;
    })
  }

  ngAfterViewInit() {
    this.bookingDisplay.paginator = this.paginator;
  }


  ngOnDestroy() {
    this.bookingActionIsActive = false;
  }
}
