import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="bi bi-cloud-sun me-2"></i>Weather App
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <i class="bi bi-house-door me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/search" routerLinkActive="active">
                <i class="bi bi-search me-1"></i>Search
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/favorites" routerLinkActive="active">
                <i class="bi bi-star me-1"></i>Favorites
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about" routerLinkActive="active">
                <i class="bi bi-info-circle me-1"></i>About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2024 Weather App. All rights reserved.</span>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }

    .navbar {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar-brand i {
      font-size: 1.25rem;
    }

    .nav-link i {
      font-size: 1.1rem;
    }

    .footer {
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class App {}
