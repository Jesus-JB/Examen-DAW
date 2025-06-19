import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherResponse, ForecastResponse } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private favoriteCitiesSubject = new BehaviorSubject<string[]>([]);
  
  constructor(private http: HttpClient) {
    this.loadFavoriteCities();
  }

  private loadFavoriteCities() {
    const favorites = localStorage.getItem('favoriteCities');
    if (favorites) {
      this.favoriteCitiesSubject.next(JSON.parse(favorites));
    }
  }

  getFavoriteCities(): Observable<string[]> {
    return this.favoriteCitiesSubject.asObservable();
  }

  addToFavorites(city: string) {
    const currentFavorites = this.favoriteCitiesSubject.value;
    if (!currentFavorites.includes(city)) {
      const newFavorites = [...currentFavorites, city];
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
      this.favoriteCitiesSubject.next(newFavorites);
    }
  }

  removeFromFavorites(city: string) {
    const currentFavorites = this.favoriteCitiesSubject.value;
    const newFavorites = currentFavorites.filter(c => c !== city);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    this.favoriteCitiesSubject.next(newFavorites);
  }

  isCityFavorite(city: string): boolean {
    return this.favoriteCitiesSubject.value.includes(city);
  }

  getCurrentWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  getForecast(city: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  getAirPollution(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );
  }

  getWeatherAlerts(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${this.apiKey}`
    );
  }

  getWeatherIcon(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }
}