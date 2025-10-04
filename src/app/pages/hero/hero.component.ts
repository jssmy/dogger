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
  // Navbar items
  readonly navbarItems = signal<NavbarItem[]>(NAVBAR_HOME_ITEMS);

  // Hero content inputs
  readonly title = input<string>('DOGGER');
  readonly subtitle = input<string>('The Ultimate Dog Companion');
  readonly description = input<string>('WE LOVE DOGS! WE PROTECT DOGS!');
  readonly contractAddress = input<string>('0x1234567890abcdef1234567890abcdef12345678');

  // Social media links
  readonly socialLinks = input<{name: string, icon: string, url: string}[]>([
    { name: 'Twitter', icon: '🐕', url: '#' },
    { name: 'Telegram', icon: '📱', url: '#' },
    { name: 'Discord', icon: '💬', url: '#' },
    { name: 'Website', icon: '🌐', url: '#' },
  ]);

  // Action buttons
  readonly primaryAction = input<{text: string, url: string}>({
    text: 'BUY NOW',
    url: '#',
  });
  readonly secondaryAction = input<{text: string, url: string}>({
    text: 'LEARN MORE',
    url: '#',
  });

  // Copy contract address functionality
  copyContractAddress(): void {
    navigator.clipboard.writeText(this.contractAddress()).then(() => {
      // You could add a toast notification here
      console.log('Contract address copied to clipboard');
    }).catch((error) => {
      console.error('Failed to copy contract address:', error);
    });
  }
}
