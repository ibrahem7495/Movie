import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
// import { data } from 'src/app/models/data';

@Component({
  selector: 'app-browse-movies',
  templateUrl: './browse-movies.component.html',
  styleUrls: ['./browse-movies.component.css'],
})
export class BrowseMoviesComponent implements OnInit {
  allMovies?: Movie[];
  movieCount?: number;
  numberOfPages: number;
  pagesArray: number[];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pagesArray = [];
    this.numberOfPages = 1;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMapvalue) => {
        const quickSearchValue = paramMapvalue.get('quickSearch');
        if (quickSearchValue == 'defolt') {
          // get all mivies
          this.apiService.getAllMovies().subscribe({
            next: (getingValue) => {
              this.allMovies = getingValue;
              console.log('getAllMovies', this.allMovies);
            },
            error: (err) => {
              console.error(err);
            },
          });
        } else if (quickSearchValue && quickSearchValue !== 'defolt') {
          console.log('else');

          // this.search(quickSearchValue,);
        }
      },
    });
  }
  search(searchTearm: string,bageNum :number) {
    this.apiService.searshForMovies(searchTearm,bageNum ).subscribe({
      next: (dataValue) => {
        console.log('dataValue', dataValue);

        this.movieCount = dataValue.movie_count;
        this.allMovies = dataValue.movies;
        console.log('this.allMovies', this.allMovies);
        if (this.movieCount) {
          this.numberOfPages = Math.ceil(this.movieCount / 12); //  4.2 = > 5  example if the divesion result = 4.2 the Math.ceil result is 5
          this.pagesArray = this.generatePagesArray(this.movieCount);
        }
      },
    });
  }
  generatePagesArray(length: number): number[] {
    const generatedArray = [];
    for (let index = 0; index < this.numberOfPages; index++) {
      generatedArray.push(index + 1);
    }
    return generatedArray;
  }
}
