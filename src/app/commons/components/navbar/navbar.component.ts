import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarItem } from '../../interfaces/navbar-items';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { AppSettings } from '../../utils/app-settings';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly items = input.required<NavbarItem[]>();
  readonly authService = inject(AuthService);
  private readonly route = inject(Router);
  private readonly loginService = inject(LoginService);

  readonly currentUrl = computed(() => this.route.url);

  readonly appSettings = AppSettings;

  isActiveRoute(route: string) {
    if (this.currentUrl() === '/' || this.currentUrl() === '') {
      return false;
    }
    return route.startsWith(this.currentUrl());
  }
  

  logout() {
    this.loginService.out().subscribe({
      next: () => this.route.navigate(['/']),
      error: () => Swal.fire("Ups!", 'Error trying close session, please try again!', 'error')
    });
  }

}
