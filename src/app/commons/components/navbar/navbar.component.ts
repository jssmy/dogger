import { Component, effect, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarItem } from '../../interfaces/navbar-items';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly items = input.required<NavbarItem[]>();
  readonly authService = inject(AuthService);
  readonly route = inject(Router);
  readonly loginService = inject(LoginService);

  logout() {
    this.loginService.out().subscribe({
      next: () => this.route.navigate(['/']),
      error: () => Swal.fire('Ups!', 'Error trying close session, please try again!', 'error'),
    });
  }

}
