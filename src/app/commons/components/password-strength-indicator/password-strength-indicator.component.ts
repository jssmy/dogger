import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bgz-password-strength-indicator',
  imports: [CommonModule],
  templateUrl: './password-strength-indicator.component.html',
  styleUrl: './password-strength-indicator.component.scss'
})
export class PasswordStrengthIndicatorComponent {
  strength = input<number>(0);
  level = input<'easy' | 'medium' | 'hard'>('easy');

  getStrengthPercentage(): number {
    const strength = this.strength();
    if (strength <= 3) return 33; // 33% for weak
    if (strength <= 6) return 66; // 66% for medium
    return 100; // 100% for strong
  }

  getStrengthText(): string {
    const level = this.level();
    switch (level) {
      case 'easy':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'hard':
        return 'Strong';
      default:
        return 'Weak';
    }
  }

  getStrengthColor(): string {
    const level = this.level();
    switch (level) {
      case 'easy':
        return '#dc3545'; // Red
      case 'medium':
        return '#ffc107'; // Yellow
      case 'hard':
        return '#28a745'; // Green
      default:
        return '#dc3545';
    }
  }

  getProgressBarClass(): string {
    const level = this.level();
    switch (level) {
      case 'easy':
        return 'progress-bar bg-danger'; // Bootstrap danger class (red)
      case 'medium':
        return 'progress-bar bg-warning'; // Bootstrap warning class (yellow)
      case 'hard':
        return 'progress-bar bg-success'; // Bootstrap success class (green)
      default:
        return 'progress-bar bg-danger';
    }
  }
}
