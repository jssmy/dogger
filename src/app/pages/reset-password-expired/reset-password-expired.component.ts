import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'bgz-reset-password-expired',
  imports: [
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './reset-password-expired.component.html',
  styleUrl: './reset-password-expired.component.scss'
})
export default class ResetPasswordExpiredComponent {
  router = inject(Router);

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}


