import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './bookings/booking-details/booking-details.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CinemaHallComponent } from './cinema-hall/cinema-hall.component';
import { CinemaComponent } from './cinema/cinema.component';
import { CityComponent } from './city/city.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewMovieComponent } from './movies/add-new-movie/add-new-movie.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'add-movie', component: AddNewMovieComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cinemas', component: CinemaComponent },
  { path: 'cinema-hall', component: CinemaHallComponent },
  { path: 'booking', component: BookingsComponent },
  { path: 'show', component: ShowComponent },
  { path: 'addCity', component: CityComponent },
  { path: 'booking-details/:bookingId', component: BookingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
