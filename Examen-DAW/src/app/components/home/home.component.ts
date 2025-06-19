import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbCarouselModule],
  template: `
    <div class="container mt-5">
      <ngb-carousel class="mb-5">
        <ng-template ngbSlide>
          <div class="carousel-image" style="background-image: url('assets/weather1.jpg')">
            <div class="carousel-caption">
              <h3>Accurate Weather Forecasts</h3>
              <p>Get detailed weather information for any city worldwide</p>
            </div>
          </div>
        </ng-template>
        <ng-template ngbSlide>
          <div class="carousel-image" style="background-image: url('assets/weather2.jpg')">
            <div class="carousel-caption">
              <h3>Air Quality Index</h3>
              <p>Monitor air pollution levels in your area</p>
            </div>
          </div>
        </ng-template>
        <ng-template ngbSlide>
          <div class="carousel-image" style="background-image: url('assets/weather3.jpg')">
            <div class="carousel-caption">
              <h3>Weather Alerts</h3>
              <p>Stay informed about severe weather conditions</p>
            </div>
          </div>
        </ng-template>
      </ngb-carousel>

      <div class="jumbotron text-center">
        <h1 class="display-4">Weather App</h1>
        <p class="lead">Check the weather conditions worldwide</p>
        <hr class="my-4">
        <p>Get started by searching for a city or checking your favorites</p>
        <div class="d-flex justify-content-center gap-3">
          <a routerLink="/search" class="btn btn-primary btn-lg">Search Weather</a>
          <a routerLink="/favorites" class="btn btn-secondary btn-lg">View Favorites</a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <i class="bi bi-search fs-1"></i>
              <h5 class="card-title mt-3">Search Cities</h5>
              <p class="card-text">Search for any city worldwide to get detailed weather information.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <i class="bi bi-clock-history fs-1"></i>
              <h5 class="card-title mt-3">5-Day Forecast</h5>
              <p class="card-text">Get a detailed 5-day weather forecast with temperature trends.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <i class="bi bi-star fs-1"></i>
              <h5 class="card-title mt-3">Favorites</h5>
              <p class="card-text">Save your favorite cities for quick weather updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .carousel-image {
      height: 400px;
      background-size: cover;
      background-position: center;
    }
    .carousel-caption {
      background: rgba(0, 0, 0, 0.5);
      padding: 20px;
      border-radius: 10px;
    }
    ngb-carousel {
      max-width: 100%;
      margin: 0 auto;
    }
  `]
})
export class HomeComponent {}