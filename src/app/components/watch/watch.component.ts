import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from './../../models/movie';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sugestion } from 'src/app/models/sugestion';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
})
export class WatchComponent implements OnInit {
  movieToWatch: Movie;
  sugestionMovies: Sugestion[];
  videoUrl?: SafeResourceUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {
    // initial value of movieToWatch
    this.movieToWatch = {
      background_image: '',
      background_image_original: '',
      date_uploaded: '',
      date_uploaded_unix: 0,
      description_full: '',
      genres: [''],
      id: 0,
      imdb_code: '',
      language: '',
      large_cover_image: '',
      medium_cover_image: '',
      mpa_rating: '',
      rating: 0,
      runtime: 0,
      slug: '',
      small_cover_image: '',
      state: '',
      summary: '',
      synopsis: '',
      title: '',
      title_english: '',
      title_long: '',
      torrents: [{ url: '', quality: '', type: '' }], // Adjust as needed
      url: '',
      year: 0,
      yt_trailer_code: '',
    };
    // initial value of sugestionMovies
    this.sugestionMovies = [
      { medium_cover_image: '', id: 0 },
      { medium_cover_image: '', id: 0 },
      { medium_cover_image: '', id: 0 },
      { medium_cover_image: '', id: 0 },
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMapData) => {
        const idValue = Number(paramMapData.get('wacthMovieId'));

        // main wacthibg movie
        this.apiService.getMovieById(idValue).subscribe({
          next: (movieDetal) => {
            console.log(movieDetal);
            this.movieToWatch = movieDetal;
            console.log(' this.movieToWatch', this.movieToWatch);
            // tralier YouTube video ID
            const videoId = this.movieToWatch.yt_trailer_code; // video youtube ID
            console.log('videoId', videoId);
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${videoId}`
            );
          },
          //
        });
        // similar movie
        this.apiService.getMovieSugstion(idValue).subscribe({
          next: (sugestion) => {
            console.log('sugestion', sugestion);

            this.sugestionMovies = sugestion;
            console.log('sugestionMovies', this.sugestionMovies);
          },
        });
      },
    });
  }
}
