import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Buscar Clima</h2>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Ingresa el nombre de una ciudad..."
              [(ngModel)]="cityName"
              (keyup.enter)="searchWeather()"
            >
            <button
              class="btn btn-primary"
              type="button"
              (click)="searchWeather()"
            >
              <i class="bi bi-search me-2"></i>Buscar
            </button>
          </div>

          <div *ngIf="error" class="alert alert-danger">
            {{ error }}
          </div>

          <div *ngIf="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>

          <!-- Resultados del clima -->
          <div *ngIf="currentWeather && !loading" class="mt-4">
            <div class="d-flex justify-content-between align-items-start">
              <h3>{{ currentWeather.name }}, {{ currentWeather.sys.country }}</h3>
              <button class="btn btn-link" (click)="toggleFavorite()">
                <i class="bi" [ngClass]="{
                  'bi-star-fill': isFavorite,
                  'bi-star': !isFavorite
                }"></i>
              </button>
            </div>

            <div class="weather-info mt-4">
              <div class="row">
                <div class="col-md-6 text-center">
                  <img
                    [src]="weatherService.getWeatherIcon(currentWeather.weather[0].icon)"
                    [alt]="currentWeather.weather[0].description"
                    class="weather-icon mb-2"
                  >
                  <h2>{{ currentWeather.main.temp | number:'1.0-0' }}°C</h2>
                  <p class="text-muted">{{ currentWeather.weather[0].description | titlecase }}</p>
                </div>
                <div class="col-md-6">
                  <div class="weather-details">
                    <p><i class="bi bi-thermometer-high"></i> Máxima: {{ currentWeather.main.temp_max | number:'1.0-0' }}°C</p>
                    <p><i class="bi bi-thermometer-low"></i> Mínima: {{ currentWeather.main.temp_min | number:'1.0-0' }}°C</p>
                    <p><i class="bi bi-moisture"></i> Humedad: {{ currentWeather.main.humidity }}%</p>
                    <p><i class="bi bi-wind"></i> Viento: {{ currentWeather.wind.speed }} m/s</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calidad del Aire -->
            <div *ngIf="airQuality" class="mt-4">
              <h4>Calidad del Aire</h4>
              <div class="air-quality-info">
                <div class="alert" [ngClass]="{
                  'alert-success': airQuality.list[0].main.aqi <= 2,
                  'alert-warning': airQuality.list[0].main.aqi === 3,
                  'alert-danger': airQuality.list[0].main.aqi > 3
                }">
                  <h5 class="mb-2">{{ getAirQualityLevel(airQuality.list[0].main.aqi) }}</h5>
                  <p class="mb-0">Índice de Calidad del Aire: {{ airQuality.list[0].main.aqi }}</p>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="recentSearches.length > 0" class="mt-4">
            <h5>Búsquedas Recientes</h5>
            <div class="d-flex flex-wrap gap-2">
              <button
                *ngFor="let city of recentSearches"
                class="btn btn-outline-secondary btn-sm"
                (click)="searchCity(city)"
              >
                {{ city }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  `,
  styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .input-group .btn {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  `]
})
export class SearchComponent {
  cityName = '';
  loading = false;
  error = '';
  recentSearches: string[] = [];
  currentWeather: WeatherResponse | null = null;
  airQuality: any = null;
  isFavorite = false;

  constructor(
    public weatherService: WeatherService,
    private router: Router
  ) {}

searchWeather() {
  if (!this.cityName.trim()) {
    this.error = 'Por favor ingresa el nombre de una ciudad';
    return;
  }

  this.loading = true;
  this.error = '';

  this.weatherService.getCurrentWeather(this.cityName).subscribe({
    next: (data) => {
      this.loading = false;
      this.addToRecentSearches(this.cityName);
      this.router.navigate(['/weather', this.cityName]);
    },
    error: (error) => {
      this.loading = false;
      this.error = 'Ciudad no encontrada. Intenta nuevamente.';
    }
  });
}


  searchCity(city: string) {
    this.cityName = city;
    this.searchWeather();
  }

  private addToRecentSearches(city: string) {
    const normalizedCity = city.trim();
    if (!this.recentSearches.includes(normalizedCity)) {
      this.recentSearches.unshift(normalizedCity);
      if (this.recentSearches.length > 5) {
        this.recentSearches.pop();
      }
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.weatherService.removeFromFavorites(this.cityName);
    } else {
      this.weatherService.addToFavorites(this.cityName);
    }
    this.isFavorite = !this.isFavorite;
  }

  getAirQualityLevel(aqi: number): string {
  const levels = [
    'Buena',
    'Aceptable',
    'Moderada',
    'Mala',
    'Muy mala'
  ];
  return levels[aqi - 1] || 'Desconocida';
}

}