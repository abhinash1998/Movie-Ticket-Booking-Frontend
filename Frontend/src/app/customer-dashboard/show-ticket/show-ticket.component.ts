import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';
import { takeWhile } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-ticket',
  templateUrl: './show-ticket.component.html',
  styleUrls: ['./show-ticket.component.css']
})
export class ShowTicketComponent implements OnInit {
  customerId: any;
  showTicketActionIsActive: boolean = true;
  ticketDetails: any;

  @ViewChild('content') element!: ElementRef;

  constructor(private bookingContext: BookingService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.getLatestBookingByUserId(this.customerId)
  }

  getLatestBookingByUserId(customerId: string) {
    this.bookingContext.getLatestBookingByUserId(customerId).pipe(takeWhile(() => this.showTicketActionIsActive))
      .subscribe({
        next: (res) => {
          this.ticketDetails = res.result;
        },
        error: (error) => console.log(error)
      })

  }

  printTicket() {
    html2canvas(this.element.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/jpeg');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let pdf = new jsPDF('l', 'ex', 'a4',);
      pdf.addImage(imageGeneratedFromTemplate, 'JPEG', 0, 5, fileWidth, generatedImageHeight,);
      pdf.html(this.element.nativeElement.innerHTML)
      pdf.save('ticket.pdf');
    });
  }

  ngOnDestroy() {
    this.showTicketActionIsActive = false;
  }


}
