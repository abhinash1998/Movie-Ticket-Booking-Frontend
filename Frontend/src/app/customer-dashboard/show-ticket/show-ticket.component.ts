import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-show-ticket',
  templateUrl: './show-ticket.component.html',
  styleUrls: ['./show-ticket.component.css']
})
export class ShowTicketComponent implements OnInit {
  customerId:any;
  showTicketActionIsActive:boolean = true;
  ticketDetails:any;
  constructor( private bookingContext: BookingService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.getLatestBookingByUserId(this.customerId)
  }

  getLatestBookingByUserId(customerId: string){
    this.bookingContext.getLatestBookingByUserId(customerId).pipe(takeWhile(() => this.showTicketActionIsActive)).subscribe(res => {
      this.ticketDetails = res.result;  
      console.log(res.result)   
    })
  }

  
  ngOnDestroy() {
    this.showTicketActionIsActive = false;
  }
 

}
