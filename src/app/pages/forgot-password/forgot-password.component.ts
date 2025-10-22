import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../commons/components/input/input.component';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { LoaderService } from '../../commons/services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorControlDirective } from '../../commons/directives/error-control.directive';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ForgotPasswordPresenter } from './forgot-password.presenter';
import { PasswordService } from '../../commons/services/password.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    ErrorControlDirective,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export default class ForgotPasswordComponent {

  loader = inject(LoaderService);
  presenter = inject(ForgotPasswordPresenter);
  passwordService = inject(PasswordService);
  route = inject(Router);
  errorMessage = signal<string | null>(null);

  requestPasswordReset() {
    if (this.presenter.form.valid) {
      this.loader.active();
      this.passwordService.requestPasswordReset(this.presenter.emailValue() || '')
        .subscribe({
          next: () => {
            this.loader.inactive();
            this.route.navigate(['/forgot-password-confirmation']);
          },
          error: (err: HttpErrorResponse) => {
            this.loader.inactive();
            if (err.status === HttpStatusCode.NotFound) {
              this.presenter.setEmailErrorControl();
            } else {
              this.errorMessage.set(err.error?.message || 'Error al solicitar cambio de contraseña');
            }
          }
        });
    }
  }
}
