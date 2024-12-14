import { Component, effect, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarItem } from '../../interfaces/navbar-items';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items = input.required<NavbarItem[]>();
  authService = inject(AuthService);
}
