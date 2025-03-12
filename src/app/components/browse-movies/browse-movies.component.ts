import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-movies',
  templateUrl: './browse-movies.component.html',
  styleUrls: ['./browse-movies.component.css']
})
export class BrowseMoviesComponent implements OnInit {
  allMovies?:Movie[];
  constructor(private apiService:ApiService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
this.activatedRoute.paramMap.subscribe({
  next:(paramMapvalue)=> {
     const quickSearchValue= paramMapvalue.get('quickSearch')
     console.log('quickSearchValue',quickSearchValue)
if (quickSearchValue) {
this.search(quickSearchValue)
}else{
   // get all mivies
  this.apiService.getAllMovies().subscribe({
    next:(getingValue)=>{this.allMovies=getingValue;
      console.log(this.allMovies)
    },
    error:(err)=>{console.error(err)}
  })}
  },

})



  }
  search(searchTearm :string){
    console.log("searchTearm",searchTearm)

    this.apiService.getFilteredMovies(searchTearm).subscribe({
       next:(getingValue)=>{this.allMovies=getingValue;
        console.log(this.allMovies)
      },
    })
  }

}
