import { LayoutComponent } from './layoutModule/compoonents/layout/layout/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WatchComponent } from './components/watch/watch.component';
import { BrowseMoviesComponent } from './components/browse-movies/browse-movies.component';

const routes: Routes = [
  {path:'',redirectTo :'home',pathMatch :'full'},//
  {path : '',component : LayoutComponent,children:[
   {path : 'home',component : HomeComponent},
   {path : 'watch/:wacthMovieId',component : WatchComponent},
   {path : 'browseMovies/:quickSearch',component : BrowseMoviesComponent},

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
