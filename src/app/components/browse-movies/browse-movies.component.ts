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
  pagesToShowArray: number[];
  currentPageNum: number;
  maxPagesToShow: number = 5; // Number of pages to display at a time

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pagesArray = [];
    this.numberOfPages = 1;
    this.currentPageNum = 0;
    this.pagesToShowArray = Array.from(
      { length: this.numberOfPages },
      (_, i) => i + 1
    );
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

          this.search(quickSearchValue,1);
        }
      },
    });
  }
  search(searchTearm: string, pageNum: number) {
    this.apiService.searshForMovies(searchTearm, pageNum).subscribe({
      next: (dataValue) => {
        console.log('dataValue', dataValue);

        this.movieCount = dataValue.movie_count;
        this.allMovies = dataValue.movies;
        console.log('this.allMovies', this.allMovies);
        if (this.movieCount) {
          this.numberOfPages = Math.ceil(this.movieCount / 12); //  4.2 = > 5  example if the divesion result = 4.2 the Math.ceil result is 5
          // this.pagesArray=this.generatePagesArray( this.numberOfPages)
          this.pagenation();
        }
        // my pagination
        // if (this.currentPageNum<=1) {
        //   this.currentPageNum=2;
        // }
        // if(this.numberOfPages<=2){
        //   this.currentPageNum=1
        // }
      },
    });
  }

  // my pagination
  // pagenation(curentPage:number,searchValue:string){
  //     this.currentPageNum=curentPage;
  // this.search(searchValue,curentPage)
  // }

  pagenation() {
    //chat gpt pagination

    let startPage = Math.max(
      1,
      this.currentPageNum - Math.floor(this.maxPagesToShow / 2)
    );
    let endPage = Math.min(
      this.numberOfPages,
      startPage + this.maxPagesToShow - 1
    );

    // Ensure we always display 5 pages if possible
    if (endPage - startPage < this.maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - this.maxPagesToShow + 1);
    }

    this.pagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  //chat gpt pagination
  changePage(page: number, searchValue: string) {
    if (page >= 1 && page <= this.numberOfPages) {
      this.currentPageNum = page;
      this.search(searchValue, page);
    }
  }
}
