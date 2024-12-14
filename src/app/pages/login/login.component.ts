import { Component, inject } from '@angular/core';
import { InputComponent } from '../../commons/components/input/input.component';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { LoaderService } from '../../commons/services/loader.service';
import { timer } from 'rxjs';
import { LoginService } from '../../commons/services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPresenter } from './login.presenter';
import { ErrorControlDirective } from '../../commons/directives/error-control.directive';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    ErrorControlDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  loader = inject(LoaderService);
  presenter = inject(LoginPresenter);
  loginService = inject(LoginService);
  route = inject(Router);

  constructor() { 
  }

  login() {
    if (this.presenter.form.valid) {
      this.loginService.in(this.presenter.credentials())
      .subscribe({
        next: () => this.route.navigate(['main']),
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Unauthorized) {
              this.presenter.setCredentialErrorControl();
          }
        }
      });
    }

  }

}
