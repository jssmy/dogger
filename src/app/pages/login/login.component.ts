import { NavbarComponent } from '@/app/commons/components/navbar/navbar.component';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { InputComponent } from '../../commons/components/input/input.component';
import { ErrorControlDirective } from '../../commons/directives/error-control.directive';
import { LoaderService } from '../../commons/services/loader.service';
import { LoginService } from '../../commons/services/login.service';
import { LoginPresenter } from './login.presenter';

@Component({
  selector: 'bgz-login',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    ErrorControlDirective,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  loader = inject(LoaderService);
  presenter = inject(LoginPresenter);
  loginService = inject(LoginService);
  route = inject(Router);
  errorMessage = signal<string | null>(null);


  login() {
    if (this.presenter.form.valid) {
      this.loginService.in(this.presenter.credentials())
        .subscribe({
          next: () => this.route.navigate(['home']),
          error: (err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.BadRequest) {
              this.presenter.setCredentialErrorControl();
            } else if (err.status === HttpStatusCode.Forbidden) {
              this.errorMessage.set(err.error.message);
            }
          }
        });
    }

  }

}
