import { Component, OnChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-tips',
  imports: [CommonModule],
  templateUrl: './tips.html',
  styleUrl: './tips.css'
})
export class Tips implements OnChanges {
 @Input() weather: WeatherResponse | null = null;
  tip = '';
  emoji = 'ℹ️';
  colorClass = 'alert-info';

  ngOnChanges(): void {
    if (!this.weather) return;

    const description = this.weather.weather[0].description.toLowerCase();

    if (description.includes('rain')) {
      this.tip = 'Parece que va a llover. ¡Lleva paraguas!';
      this.emoji = '🌧️';
      this.colorClass = 'alert-primary';
    } else if (description.includes('snow')) {
      this.tip = 'Día nevado. ¡Abrígate bien!';
      this.emoji = '❄️';
      this.colorClass = 'alert-light';
    } else if (description.includes('clear')) {
      this.tip = 'Día soleado. ¡Usa bloqueador solar!';
      this.emoji = '☀️';
      this.colorClass = 'alert-warning';
    } else if (description.includes('cloud')) {
      this.tip = 'Día nublado. Perfecto para salir a caminar.';
      this.emoji = '☁️';
      this.colorClass = 'alert-secondary';
    } else if (description.includes('thunderstorm')) {
      this.tip = 'Hay tormenta. Es mejor quedarse en casa.';
      this.emoji = '⛈️';
      this.colorClass = 'alert-danger';
    } else {
      this.tip = 'Revisa las condiciones antes de salir.';
      this.emoji = '🌦️';
      this.colorClass = 'alert-info';
    }
  }
}
