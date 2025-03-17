import { Movie } from './movie';

export interface data {

  limit: number,
  movie_count: number,
  movies: Movie[],
  page_number: number,

}
