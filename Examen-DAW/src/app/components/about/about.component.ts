import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">About Weather App</h2>
              
              <div class="text-center mb-4">
                <i class="bi bi-cloud-sun display-1 text-primary"></i>
              </div>

              <p class="lead text-center mb-4">
                Your comprehensive weather companion for accurate forecasts worldwide
              </p>

              <div class="features mb-4">
                <h4 class="mb-3">Key Features:</h4>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="feature-item">
                      <i class="bi bi-search text-primary"></i>
                      <h5>City Search</h5>
                      <p>Search weather information for any city worldwide</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="feature-item">
                      <i class="bi bi-graph-up text-primary"></i>
                      <h5>Detailed Forecast</h5>
                      <p>Get 5-day weather forecasts with detailed information</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="feature-item">
                      <i class="bi bi-star text-primary"></i>
                      <h5>Favorites</h5>
                      <p>Save your favorite cities for quick access</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="feature-item">
                      <i class="bi bi-lightning text-primary"></i>
                      <h5>Real-time Updates</h5>
                      <p>Get current weather conditions instantly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tech-stack mb-4">
                <h4 class="mb-3">Technology Stack:</h4>
                <ul class="list-group">
                  <li class="list-group-item d-flex align-items-center">
                    <i class="bi bi-angular text-danger me-2"></i>
                    Angular 20.0.0
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="bi bi-bootstrap text-primary me-2"></i>
                    Bootstrap 5.3
                  </li>
                  <li class="list-group-item d-flex align-items-center">
                    <i class="bi bi-cloud text-info me-2"></i>
                    OpenWeatherMap API
                  </li>
                </ul>
              </div>

              <div class="text-center">
                <p class="mb-0">Version 1.0.0</p>
                <p class="text-muted">Created by Jesus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .feature-item {
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: #f8f9fa;
      height: 100%;
      transition: transform 0.2s;
    }
    .feature-item:hover {
      transform: translateY(-5px);
    }
    .feature-item i {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .feature-item h5 {
      margin-bottom: 0.5rem;
    }
    .feature-item p {
      margin-bottom: 0;
      color: #6c757d;
    }
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .list-group-item i {
      font-size: 1.25rem;
    }
  `]
})
export class AboutComponent {}