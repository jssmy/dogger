import { Injectable } from '@angular/core';

export interface PasswordStrengthResult {
  score: number;
  level: 'easy' | 'medium' | 'hard';
  feedback: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {

  calculateStrength(password: string): number {
    if (!password) return 0;

    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Add special characters');

    // Pattern checks
    if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters
    else feedback.push('Avoid repeated characters');

    if (!/123|abc|qwe|asd|zxc/i.test(password)) score += 1; // No common sequences
    else feedback.push('Avoid common sequences');

    // Common password check
    const commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
    if (!commonPasswords.some(common => password.toLowerCase().includes(common))) score += 1;
    else feedback.push('Avoid common passwords');

    return Math.min(score, 10); // Cap at 10
  }

  getStrengthLevel(password: string): 'easy' | 'medium' | 'hard' {
    const score = this.calculateStrength(password);

    if (score <= 3) return 'easy';
    if (score <= 6) return 'medium';
    return 'hard';
  }

  getStrengthFeedback(password: string): string[] {
    const feedback: string[] = [];

    if (!password) return ['Enter a password'];

    if (password.length < 8) feedback.push('Use at least 8 characters');
    if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters');
    if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
    if (!/[0-9]/.test(password)) feedback.push('Add numbers');
    if (!/[^A-Za-z0-9]/.test(password)) feedback.push('Add special characters');
    if (/(.)\1{2,}/.test(password)) feedback.push('Avoid repeated characters');
    if (/123|abc|qwe|asd|zxc/i.test(password)) feedback.push('Avoid common sequences');

    const commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      feedback.push('Avoid common passwords');
    }

    return feedback;
  }

  getStrengthPercentage(password: string): number {
    const score = this.calculateStrength(password);
    return (score / 10) * 100;
  }
}
