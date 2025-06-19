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
        <div class="carousel-image" style="background-image: url('assets/weather1.svg')">
          <div class="carousel-caption">
            <h3>Pronósticos del clima precisos</h3>
            <p>Obtén información meteorológica detallada de cualquier ciudad del mundo</p>
          </div>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <div class="carousel-image" style="background-image: url('assets/weather2.svg')">
          <div class="carousel-caption">
            <h3>Índice de calidad del aire</h3>
            <p>Monitorea los niveles de contaminación en tu zona</p>
          </div>
        </div>
      </ng-template>
      <ng-template ngbSlide>
        <div class="carousel-image" style="background-image: url('assets/weather3.svg')">
          <div class="carousel-caption">
            <h3>Alertas meteorológicas</h3>
            <p>Mantente informado sobre condiciones climáticas severas</p>
          </div>
        </div>
      </ng-template>
    </ngb-carousel>

    <div class="jumbotron text-center">
      <h1 class="display-4">Aplicación del Clima</h1>
      <p class="lead">Consulta las condiciones climáticas en todo el mundo</p>
      <hr class="my-4">
      <p>Empieza buscando una ciudad o revisando tus favoritas</p>
      <div class="d-flex justify-content-center gap-3">
        <a routerLink="/search" class="btn btn-primary btn-lg">Buscar clima</a>
        <a routerLink="/favorites" class="btn btn-secondary btn-lg">Ver favoritas</a>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <i class="bi bi-search fs-1"></i>
            <h5 class="card-title mt-3">Buscar ciudades</h5>
            <p class="card-text">Busca cualquier ciudad del mundo para obtener información climática detallada.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <i class="bi bi-clock-history fs-1"></i>
            <h5 class="card-title mt-3">Pronóstico de 5 días</h5>
            <p class="card-text">Consulta un pronóstico detallado de 5 días con tendencias de temperatura.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <i class="bi bi-star fs-1"></i>
            <h5 class="card-title mt-3">Favoritas</h5>
            <p class="card-text">Guarda tus ciudades favoritas para acceder rápidamente a su clima.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`
,
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