import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Social } from '../social/social';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,Social],
  template: `
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Acerca de la Aplicación del Clima</h2>

            <div class="text-center mb-4">
              <i class="bi bi-cloud-sun display-1 text-primary"></i>
            </div>

            <p class="lead text-center mb-4">
              Tu compañero meteorológico completo para pronósticos precisos en todo el mundo.
            </p>

            <div class="features mb-4">
              <h4 class="mb-3">Características principales:</h4>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="feature-item">
                    <i class="bi bi-search text-primary"></i>
                    <h5>Búsqueda de ciudades</h5>
                    <p>Consulta el clima de cualquier ciudad del mundo</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="feature-item">
                    <i class="bi bi-graph-up text-primary"></i>
                    <h5>Pronóstico detallado</h5>
                    <p>Obtén pronósticos del clima por 5 días con información detallada</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="feature-item">
                    <i class="bi bi-star text-primary"></i>
                    <h5>Favoritas</h5>
                    <p>Guarda tus ciudades favoritas para acceder rápidamente</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="feature-item">
                    <i class="bi bi-lightning text-primary"></i>
                    <h5>Actualizaciones en tiempo real</h5>
                    <p>Consulta las condiciones actuales al instante</p>
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
<app-social></app-social>

            <div class="text-center">
              <p class="mb-0">Versión 1.0.0</p>
              <p class="text-muted">Creado por Jesus Jimenez, Kevin Roman, Nicolas Lopez</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
,
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