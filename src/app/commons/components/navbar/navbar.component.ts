import { Component, effect, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarItem } from '../../interfaces/navbar-items';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterModule,
        CommonModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items = input.required<NavbarItem[]>();
  authService = inject(AuthService);
  route = inject(Router);
  loginService = inject(LoginService);

  logout() {
    this.loginService.out().subscribe({
      next: () => this.route.navigate(['/']),
      error: () => Swal.fire("Ups!", 'Error trying close session, please try again!', 'error')
    });
  }

}
