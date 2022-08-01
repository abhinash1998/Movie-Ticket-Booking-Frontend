import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../Interfaces/IMovie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  addMovie(movie: IMovie): Observable<IMovie> {

    const movieData: any = new FormData();

    movieData.append("title", movie.title);
    movieData.append("releaseDate", movie.releaseDate);
    movieData.append("cast", movie.cast);
    movieData.append("director", movie.director);
    movieData.append("description", movie.description);
    movieData.append("genre", movie.genre);
    movieData.append("language", movie.language);
    movieData.append("trailerLink", movie.trailerLink);
    movieData.append("durationInMins", movie.durationInMins);
    movieData.append("format", movie.format);
    movieData.append("imagePath", movie.imagePath);

    return this.http.post<IMovie>(`${environment.baseUrl}/addMovie`, movieData);
  }

  getMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showMovies`);
  }

  getMovieById(movieId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("movieId", movieId);
    return this.http.get(`${environment.baseUrl}/getMovieById`, { params: queryParams });
  }

  deleteMovie(movieId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("movieId", movieId);
    return this.http.get(`${environment.baseUrl}/deleteMovie`, { params: queryParams });
  }
}
