import { Movie } from './../../models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  movieToWatch! :Movie ;
  sugestionMovies!:Movie[];

  constructor(private activatedRoute:ActivatedRoute ,private apiService:ApiService) {


  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next : (paramMapData)=>{
        const idValue =Number(paramMapData.get('wacthMovieId'));

        // main wacthibg movie
        this.apiService.getMovieById(idValue).subscribe({
          next:(movieDetal)=>{
            console.log(movieDetal);
            this.movieToWatch=movieDetal;
            console.log(' this.movieToWatch', this.movieToWatch);

           },
        //
   })
            // similar movie
           this.apiService.getMovieSugstion(idValue).subscribe({
            next:(sugestion)=>{
              console.log('sugestion',sugestion)

              this.sugestionMovies=sugestion;
              console.log('sugestionMovies',this.sugestionMovies)

            }
           })
      }
    })


  }

}
