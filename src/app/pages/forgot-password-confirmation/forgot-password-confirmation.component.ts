import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password-confirmation',
  imports: [
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './forgot-password-confirmation.component.html',
  styleUrl: './forgot-password-confirmation.component.scss',
})
export default class ForgotPasswordConfirmationComponent {

  route = inject(Router);

  goToLogin() {
    this.route.navigate(['/login']);
  }
}
