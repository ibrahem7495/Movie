import { Movie } from 'src/app/models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Movies ?:Movie[];//to store all mivies
  latestMovies?:Movie[];//to store latest mivies
  topRatingMvies?:Movie[];
  PopularMovies?:Movie[];
  constructor(private apiService: ApiService, private router:Router) { }

  ngOnInit(): void {
    // // get all mivies
    // this.apiService.getAllMovies().subscribe({
    //   next:(allMovies)=>{this.Movies=allMovies;
    //     console.log(this.Movies)
    //   },
    //   error:(err)=>{console.error(err)}
    // })

    //get Latist Movies
this.latistMovies();
     //get top rating Movies
this.topRatingMovies();
      //get Popular Downloads Movies
this.PopularDownloadsMovies();
  }
  
latistMovies(){
this.apiService.getLatistMovies().subscribe({
  next:(getValue)=>{
  this.latestMovies=getValue;
  }
})
}
  topRatingMovies(){
     this.apiService.getTopRatingMovies().subscribe({
  next:(getValue)=>{
  this.topRatingMvies=getValue;
  }
})
  }

  PopularDownloadsMovies(){
    this.apiService.getPopularMovies().subscribe({
 next:(getValue)=>{
 this.PopularMovies=getValue;
 }
})
  }


}
