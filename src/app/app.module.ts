import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchComponent } from './components/watch/watch.component';
import { BrowseMoviesComponent } from './components/browse-movies/browse-movies.component';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
// import{NgxYoutubePlayerModule }from 'ngx-youtube-player'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchComponent,
    BrowseMoviesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxYoutubePlayerModule,
    FormsModule,
    LayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
