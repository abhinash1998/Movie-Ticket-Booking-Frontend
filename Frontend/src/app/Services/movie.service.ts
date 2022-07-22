import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../Interfaces/Imovie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  addMovie(title: String, releaseDate: Date, cast: String, director: String,
    description: String, genre: String, language: String, trailerLink: String,
    durationInMins: Number, format: String, imagePath: File): Observable<IMovie> {

    const movieData: any = new FormData();

    movieData.append("title", title);
    movieData.append("releaseDate", releaseDate);
    movieData.append("cast", cast);
    movieData.append("director", director);
    movieData.append("description", description);
    movieData.append("genre", genre);
    movieData.append("language", language);
    movieData.append("trailerLink", trailerLink);
    movieData.append("durationInMins", durationInMins);
    movieData.append("format", format);
    movieData.append("imagePath", imagePath);

    return this.http.post<IMovie>(`${environment.baseUrl}/addMovie`, movieData);
  }

  getMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/showMovies`);
  }

  deleteMovie(movieId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("movieId", movieId);
    return this.http.get(`${environment.baseUrl}/deleteMovie`, { params: queryParams });
  }
}
