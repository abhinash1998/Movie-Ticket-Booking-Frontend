import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs';
import { MovieService } from 'src/app/Services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'releaseDate', 'director', 'cast', 'durationInMins', 'action'];
  math = Math;
  moviesDisplay = new MatTableDataSource([]);
  movieActionIsActive: boolean = true;
  length!: number;
  pageSize: number = 5;
  pageSizeOptions: any = [5, 15, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieContext: MovieService, public dialog: MatDialog, private router: Router) { }

  openDialog(movieId: string) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm: any) => {
        if (confirm) {
          this.movieContext.deleteMovie(movieId).subscribe(() => {
          })
          window.location.reload();
        }
      });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieContext.getMovies().pipe(takeWhile(() => this.movieActionIsActive)).subscribe(res => {
      this.moviesDisplay.data = res.result;
      this.length = this.moviesDisplay.data.length;
    })
  }

  ngAfterViewInit() {
    this.moviesDisplay.paginator = this.paginator;
  }

  convertMinuteToHour(minute: number) {
    var hours = this.math.floor(minute / 60);
    var minutes = minute % 60;
    var duration = hours + "h " + minutes + "m";
    return duration;
  }

  navigateToAddMoviePage() {
    this.router.navigate(['/TicketBooking/add-movie']);
  }
  ngOnDestroy() {
    this.movieActionIsActive = false;
  }
}