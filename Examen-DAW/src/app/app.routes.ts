import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'weather/:city', component: WeatherComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
