import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { MovieListByCityNameComponent } from './movie-list-by-city-name/movie-list-by-city-name.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MovieDetailsComponent } from './movie-list-by-city-name/movie-details/movie-details.component';
import { CinemaHallByMovieNameComponent } from './cinema-hall-by-movie-name/cinema-hall-by-movie-name.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    CustomerNavbarComponent,
    MovieListByCityNameComponent,
    MovieDetailsComponent,
    CinemaHallByMovieNameComponent,
    SeatLayoutComponent,
    MyBookingComponent,
    ShowTicketComponent,
    CheckoutPageComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    NgxStripeModule.forRoot('pk_test_51LQVt5SIWQnYJ3odEwV3uCQfIPXou7S6EwoFpM8vBLw7bYQqMfdCsMDCniRkUWwGRhB1yfcfNmmKgx80gbZD0k1P009WVhrFSU')
  ]
})
export class CustomerDashboardModule { }
