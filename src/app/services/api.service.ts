import { Movie } from './../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { data, } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions;
  constructor(private httpClient: HttpClient  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }
  getAllMovies():Observable<Movie[]>{
    return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json/?limit=20`).pipe(map(response=>response.data.movies))
  }
  getMovieById(id : number):Observable<Movie>{
return this.httpClient.get<any>(`${environment.APIURL}/movie_details.json?movie_id=${id}`).pipe(map(response=>response.data.movie))
  }
  getMovieSugstion(movieId :number):Observable<Movie[]>{
    return this.httpClient.get<any>(`${environment.APIURL}/movie_suggestions.json?movie_id=${movieId}`).pipe(map(response=>response.data.movies))
  }
  getLatistMovies():Observable<Movie[]>{
    return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json?sort_by=year&limit=8`).pipe(map(response=>response.data.movies))
  }
  getTopRatingMovies():Observable<Movie[]>{
    return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json?sort_by=rating&limit=8`).pipe(map(response=>response.data.movies))
  }
  getPopularMovies():Observable<Movie[]>{
    return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json?sort_by=download_count&limit=8`).pipe(map(response=>response.data.movies))
  }
//   // this function geting the trailer from youtube by using yt_trailer_code
//   getTrailer(yt_trailer_code : char){
// return this.httpClient.get<any>
//   }
// getSearchMovies(searchTerm :string):Observable<Movie[]>{
//   return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json/?page=50`).pipe(map(response=>response.data.movies),map(movies=>movies.filter(movie=>movie.title.toLowerCase().includes(searchTerm.toLowerCase())
// )))
// }
// getFilteredMovies(searchTerm: string): Observable<Movie[]> {
//   let searchArray :BehaviorSubject <Movie[]> =[];
//   for (let i = 0; i < 100; i++) {
//      this.httpClient.get<{ data: { movies: Movie[] } }>(`${environment.APIURL}/list_movies.json?limit=50&page=${i}`).pipe(
//     map(response => response.data.movies || []), // Ensure it always returns an array
//     map(movies =>
//       movies.filter((movie: Movie) =>
//         movie.title.toLowerCase().includes(searchTerm.toLowerCase(),
//     searchArray.push(movie))

//       )
//     )
//   );
// }
// return searchArray
//   }
searshForMovies(searchTerm :string ,pageNum :number):Observable<data> {
  return this.httpClient.get<any>(`${environment.APIURL}/list_movies.json?query_term=${searchTerm}&limit=12&page=${pageNum}`).pipe(map(response=>response.data))
}
}
