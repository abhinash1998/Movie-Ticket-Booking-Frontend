import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CinemaHallByMovieNameComponent } from './cinema-hall-by-movie-name/cinema-hall-by-movie-name.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-list-by-city-name/movie-details/movie-details.component';
import { MovieListByCityNameComponent } from './movie-list-by-city-name/movie-list-by-city-name.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie-list', component: MovieListByCityNameComponent },
  { path: 'booking-history', component: MyBookingComponent },
  { path: 'show-ticket', component: ShowTicketComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'movie-details/:movieId/city/:cityName', component: MovieDetailsComponent },
  { path: 'cinema-hall/:movieId/city/:cityName', component: CinemaHallByMovieNameComponent },
  { path: 'seatlayout/:movieId/:cityName/:theatreName/:showDate', component: SeatLayoutComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
