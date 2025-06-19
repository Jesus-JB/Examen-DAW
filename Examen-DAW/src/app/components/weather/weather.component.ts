import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse, ForecastResponse } from '../../interfaces/weather.interface';
import { Tips } from '../tips/tips';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, Tips],
  template: `
  <div class="container mt-5">
  <div class="row">
    <!-- Tarjeta del clima actual -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 fade-in" #weatherCard>
        <div class="card-body" *ngIf="currentWeather">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="card-title mb-0">{{ currentWeather.name }}</h2>
            <button class="btn btn-outline-primary btn-sm" (click)="toggleFavorite()">
              <i class="bi" [ngClass]="isFavorite ? 'bi-star-fill' : 'bi-star'"></i>
            </button>
          </div>

          <div class="text-center mb-4">
              <div class="d-flex justify-content-center">

            <lottie-player
              [attr.src]="lottieSrc"
              background="transparent"
              speed="1"
              style="width: 150px; height: 150px;"
              loop
              autoplay>
            </lottie-player>
              </div>
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

    <!-- Columna para pronóstico de 5 días y por hora -->
    <div class="col-md-6 mb-4 d-flex flex-column gap-4">
      <!-- Tarjeta del pronóstico de 5 días -->
      <div class="card h-100 fade-in">
        <div class="card-body">
          <h3 class="card-title mb-4">Pronóstico de 5 días</h3>
          <div class="forecast-container" *ngIf="forecast">
            <div class="forecast-item" *ngFor="let day of forecast.list | slice:0:5">
              <div class="text-center">
                <p class="mb-2">{{ day.dt * 1000 | date:'EEE' }}</p>
                <img [src]="getWeatherIcon(day.weather[0].icon)" [alt]="day.weather[0].description" class="forecast-icon mb-2">
                <p class="mb-0">{{ day.main.temp | number:'1.0-0' }}°C</p>
                <p class="mb-0 text-muted" style="font-size:0.9em;">
                  Máx: {{ day.main.temp_max | number:'1.0-0' }}°C / Mín: {{ day.main.temp_min | number:'1.0-0' }}°C
                </p>
                <p class="mb-0" style="font-size:0.9em;">
                  <i class="bi bi-wind"></i> {{ day.wind.speed }} m/s
                  <i class="bi bi-moisture ms-2"></i> {{ day.main.humidity }}%
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card h-100 fade-in">
        <div class="card-body">
          <h3 class="card-title mb-4">Pronóstico por hora</h3>
          <div class="forecast-hourly-container d-flex overflow-auto" *ngIf="forecast">
            <div class="forecast-hourly-item text-center mx-2" *ngFor="let hour of getHourlyForecast()">
              <p class="mb-1">{{ hour.dt * 1000 | date:'HH:mm' }}</p>
              <img [src]="getWeatherIcon(hour.weather[0].icon)" [alt]="hour.weather[0].description" class="forecast-icon mb-1">
              <p class="mb-0">{{ hour.main.temp | number:'1.0-0' }}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="text-center mt-4">
    <button class="btn btn-primary" (click)="downloadWeatherCard()">Descargar Tarjeta del Clima</button>
  </div>
`,
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
    .forecast-hourly-container {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
}
.forecast-hourly-item {
  min-width: 70px;
  background: var(--card-bg, #fff);
  border-radius: 8px;
  padding: 0.5rem 0.25rem;
  margin-right: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}
  `],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherComponent implements OnInit {
  @ViewChild('weatherCard') weatherCard!: ElementRef;

  currentWeather: WeatherResponse | null = null;
  forecast: ForecastResponse | null = null;
  loading = true;
  error = '';
  isFavorite = false;
  lottieSrc = 'assets/animaciones/default.json';

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.loadWeatherData(city);
        this.isFavorite = this.weatherService.isCityFavorite(city);
        this.weatherService.getFavoriteCities().subscribe(favs => {
          this.isFavorite = favs.includes(city);
        });
      }
    });
  }

  loadWeatherData(city: string) {
    this.loading = true;
    this.error = '';

    this.weatherService.getCurrentWeather(city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.lottieSrc = this.getLottieSrc(data.weather[0].main);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading weather data';
        this.loading = false;
      }
    });

    this.weatherService.getForecast(city).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: () => {
        this.error = 'Error loading forecast data';
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return this.weatherService.getWeatherIcon(iconCode);
  }

  getLottieSrc(main: string): string {
    switch (main.toLowerCase()) {
      case 'clear': return '/assets/soleado.json';
      case 'rain': return '/assets/lluvia.json';
      case 'clouds': return '/assets/nublado.json';
      case 'thunderstorm': return '/assets/tormenta.json';
      case 'snow': return '/assets/nieve.json';
      default: return '/assets/default.json';
    }
  }

  toggleFavorite() {
    if (!this.currentWeather) return;
    const city = this.currentWeather.name;
    if (this.isFavorite) {
      this.weatherService.removeFromFavorites(city);
    } else {
      this.weatherService.addToFavorites(city);
    }
  }
  downloadWeatherCard() {
    if (!this.weatherCard) return;

    html2canvas(this.weatherCard.nativeElement, { backgroundColor: '#fff' }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${this.currentWeather?.name}-weather.png`;
      link.click();
    }).catch(err => {
      console.error('Error downloading weather card:', err);
    });
  }
getHourlyForecast(): any[] {
  if (!this.forecast) return [];
  // Devuelve los próximos 8 registros (24 horas si cada uno es de 3h)
  return this.forecast.list.slice(0, 8);
}

}
