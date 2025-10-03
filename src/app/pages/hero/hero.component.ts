import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { NAVBAR_HOME_ITEMS } from '../../commons/dummy/navbar-home-items';
import { NavbarItem } from '../../commons/interfaces/navbar-items';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export default class HeroComponent {
  readonly navbarItems = signal<NavbarItem[]>(NAVBAR_HOME_ITEMS);
}
