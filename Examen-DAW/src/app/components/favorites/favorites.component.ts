import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../interfaces/weather.interface';

interface FavoriteCity {
  name: string;
  weather?: any;
  loading?: boolean;
  error?: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">Favorite Cities</h2>

      <div *ngIf="!favoriteCities.length" class="text-center py-5">
        <i class="bi bi-star display-1 text-muted mb-3 d-block"></i>
        <h3 class="text-muted">No favorite cities yet</h3>
        <p class="text-muted mb-4">Add cities to your favorites to quickly check their weather</p>
        <a routerLink="/search" class="btn btn-primary">
          <i class="bi bi-search me-2"></i>Search Cities
        </a>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let city of favoriteCities">
          <div class="card h-100" [ngClass]="{'loading': city.loading}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h3 class="card-title mb-0">{{ city.name }}</h3>
                <button class="btn btn-link text-danger p-0" (click)="removeFromFavorites(city)">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>

              <div *ngIf="city.loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div *ngIf="city.error" class="alert alert-danger">
                {{ city.error }}
              </div>

              <div *ngIf="city.weather && !city.loading" class="weather-info">
                <div class="text-center mb-3">
                  <img 
                    [src]="getWeatherIcon(city.weather.weather[0].icon)" 
                    [alt]="city.weather.weather[0].description"
                    class="weather-icon mb-2"
                  >
                  <h4 class="temperature mb-0">
                    {{ city.weather.main.temp | number:'1.0-0' }}°C
                  </h4>
                  <p class="text-muted mb-0">
                    {{ city.weather.weather[0].description | titlecase }}
                  </p>
                </div>

                <div class="weather-details">
                  <div class="row g-2">
                    <div class="col-6">
                      <small>
                        <i class="bi bi-thermometer-high text-primary"></i>
                        High: {{ city.weather.main.temp_max | number:'1.0-0' }}°C
                      </small>
                    </div>
                    <div class="col-6">
                      <small>
                        <i class="bi bi-thermometer-low text-primary"></i>
                        Low: {{ city.weather.main.temp_min | number:'1.0-0' }}°C
                      </small>
                    </div>
                    <div class="col-6">
                      <small>
                        <i class="bi bi-moisture text-primary"></i>
                        Humidity: {{ city.weather.main.humidity }}%
                      </small>
                    </div>
                    <div class="col-6">
                      <small>
                        <i class="bi bi-wind text-primary"></i>
                        Wind: {{ city.weather.wind.speed }} m/s
                      </small>
                    </div>
                  </div>
                </div>

                <div class="text-center mt-3">
                  <a [routerLink]="['/weather', city.name]" class="btn btn-outline-primary btn-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .weather-icon {
      width: 64px;
      height: 64px;
    }
    .temperature {
      font-size: 2rem;
      font-weight: bold;
    }
    .weather-details {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
    }
    .weather-details i {
      margin-right: 0.5rem;
    }
    .card {
      transition: transform 0.2s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card.loading {
      opacity: 0.7;
    }
  `]
})
export class FavoritesComponent implements OnInit {
  favoriteCities: FavoriteCity[] = [];

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.loadFavoriteCities();
  }

  private loadFavoriteCities() {
    this.weatherService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities.map(city => ({ name: city, loading: true }));
      this.loadWeatherForCities();
    });
  }

  private loadWeatherForCities() {
    this.favoriteCities.forEach(city => {
      this.weatherService.getCurrentWeather(city.name).subscribe({
        next: (data: WeatherResponse) => {
          city.weather = data;
          city.loading = false;
        },
        error: (error) => {
          city.error = 'Error loading weather data';
          city.loading = false;
        }
      });
    });
  }

  removeFromFavorites(city: FavoriteCity) {
    this.weatherService.removeFromFavorites(city.name);
    this.favoriteCities = this.favoriteCities.filter(c => c.name !== city.name);
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }
}