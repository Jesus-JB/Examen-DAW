import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse, ForecastResponse, ForecastItem } from '../../interfaces/weather.interface';
import { Tips } from '../tips/tips';
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,Tips],
  template: `
  <div class="container mt-5">
    <div class="row">
      <!-- Tarjeta del clima actual -->
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body" *ngIf="currentWeather">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="card-title mb-0">{{ currentWeather.name }}</h2>
              <button class="btn btn-outline-primary btn-sm" (click)="toggleFavorite()">
                <i class="bi" [ngClass]="isFavorite ? 'bi-star-fill' : 'bi-star'"></i>
              </button>
            </div>
            
            <div class="text-center mb-4">
              <img [src]="getWeatherIcon(currentWeather.weather[0].icon)" [alt]="currentWeather.weather[0].description" class="weather-icon mb-3">
              <h3 class="temperature">{{ currentWeather.main.temp | number:'1.0-0' }}°C</h3>
              <p class="weather-description">{{ currentWeather.weather[0].description | titlecase }}</p>
            </div>

            <div class="weather-details">
              <div class="row">
                <div class="col-6">
                  <p><i class="bi bi-thermometer-high"></i> Máxima: {{ currentWeather.main.temp_max | number:'1.0-0' }}°C</p>
                  <p><i class="bi bi-moisture"></i> Humedad: {{ currentWeather.main.humidity }}%</p>
                </div>
                <div class="col-6">
                  <p><i class="bi bi-thermometer-low"></i> Mínima: {{ currentWeather.main.temp_min | number:'1.0-0' }}°C</p>
                  <p><i class="bi bi-wind"></i> Viento: {{ currentWeather.wind.speed }} m/s</p>
                </div>
              </div>
              <app-tips [weather]="currentWeather"></app-tips>

            </div>
          </div>

          <div class="card-body text-center" *ngIf="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>

          <div class="card-body" *ngIf="error">
            <div class="alert alert-danger">{{ error }}</div>
          </div>
        </div>
      </div>

      <!-- Tarjeta del pronóstico -->
      <div class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="card-title mb-4">Pronóstico de 5 días</h3>
            
            <div class="forecast-container" *ngIf="forecast">
              <div class="forecast-item" *ngFor="let day of forecast.list | slice:0:5">
                <div class="text-center">
                  <p class="mb-2">{{ day.dt * 1000 | date:'EEE' }}</p>
                  <img [src]="getWeatherIcon(day.weather[0].icon)" [alt]="day.weather[0].description" class="forecast-icon mb-2">
                  <p class="mb-0">{{ day.main.temp | number:'1.0-0' }}°C</p>
                </div>
              </div>
            </div>

            <div class="text-center" *ngIf="loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
,
  styles: [`
    .weather-icon {
      width: 100px;
      height: 100px;
    }
    .forecast-icon {
      width: 50px;
      height: 50px;
    }
    .temperature {
      font-size: 3rem;
      font-weight: bold;
    }
    .weather-description {
      font-size: 1.2rem;
      color: #666;
    }
    .weather-details {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 0.5rem;
    }
    .weather-details i {
      margin-right: 0.5rem;
      color: #0d6efd;
    }
    .forecast-container {
      display: flex;
      justify-content: space-between;
      overflow-x: auto;
    }
    .forecast-item {
      flex: 1;
      padding: 0.5rem;
      text-align: center;
    }
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class WeatherComponent implements OnInit {
  currentWeather: WeatherResponse | null = null;
  forecast: ForecastResponse | null = null;
  loading = true;
  error = '';
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.loadWeatherData(city);
      }
    });
  }

  loadWeatherData(city: string) {
    this.loading = true;
    this.error = '';

    // Load current weather
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading weather data';
        this.loading = false;
      }
    });

    // Load forecast
    this.weatherService.getForecast(city).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (error) => {
        this.error = 'Error loading forecast data';
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Implement favorite functionality
  }
}