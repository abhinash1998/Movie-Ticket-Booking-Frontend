import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AddNewMovieComponent } from './movies/add-new-movie/add-new-movie.component';
import { MoviesComponent } from './movies/movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowComponent } from './show/show.component';
import { AddShowComponent } from './show/add-show/add-show.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from 'mat-timepicker';
import { CityComponent } from './city/city.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CinemaComponent } from './cinema/cinema.component';
import { AddCinemaComponent } from './cinema/add-cinema/add-cinema.component';
import { CinemaHallComponent } from './cinema-hall/cinema-hall.component';
import { AddCinemaHallComponent } from './cinema-hall/add-cinema-hall/add-cinema-hall.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { BookingDetailsComponent } from './bookings/booking-details/booking-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { NbThemeModule,NbLayoutModule,NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AddNewMovieComponent,
    MoviesComponent,
    ConfirmDialogComponent,
    ShowComponent,
    AddShowComponent,
    CityComponent,
    NavbarComponent,
    DashboardComponent,
    BookingsComponent,
    CinemaComponent,
    AddCinemaComponent,
    CinemaHallComponent,
    AddCinemaHallComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatTimepickerModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    NbThemeModule.forRoot(),
    NbCardModule,
    NbLayoutModule
  ]
})
export class AdminDashboardModule { }