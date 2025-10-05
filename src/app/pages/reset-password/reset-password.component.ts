import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../commons/components/input/input.component';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { LoaderService } from '../../commons/services/loader.service';
import { PasswordResetService } from '../../commons/services/password-reset.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorControlDirective } from '../../commons/directives/error-control.directive';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordStrengthIndicatorComponent } from '../../commons/components/password-strength-indicator/password-strength-indicator.component';
import { ResetPasswordPresenter } from './reset-password.presenter';

@Component({
    selector: 'app-reset-password',
    imports: [
        InputComponent,
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule,
        ErrorControlDirective,
        RouterModule
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export default class ResetPasswordComponent {

  loader = inject(LoaderService);
  presenter = inject(ResetPasswordPresenter);
  passwordResetService = inject(PasswordResetService);
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  
  token: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.route.navigate(['login']);
      }
    });
  }

  resetPassword() {
    if (this.presenter.form.valid) {
      this.loader.active();
      this.passwordResetService.resetPassword(this.token, this.presenter.passwordData())
        .subscribe({
          next: () => {
            this.loader.inactive();
            this.successMessage.set('Password has been reset successfully');
            setTimeout(() => this.route.navigate(['login']), 2000);
          },
          error: (err) => {
            this.loader.inactive();
            this.errorMessage.set(err.error?.message || 'An error occurred while resetting password');
          }
        });
    }
  }

}
