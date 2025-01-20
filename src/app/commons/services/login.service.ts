import { inject, Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, finalize, of, tap } from 'rxjs';
import { AuthToken } from '../interfaces/auth-token';
import { isPlatformBrowser } from '@angular/common';
import { AUTH_TOKEN_KEY } from '../components/tokens/auth-token-key';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  in(credential: Login) {
    return this.http.post<AuthToken>(environment.login, credential)
      .pipe(
        tap((authToken: AuthToken) => this.authService.setAuthToken = authToken)
      );
  }

  out() {
    return this.http.post(environment.logout, null)
      .pipe(
        catchError(err => {
          if (err.status != HttpStatusCode.Unauthorized) {
            throw new Error('Error trying logout')
          }

          this.authService.logout();

          return of();
        },
        ),
        finalize(() => this.authService.logout())
      );
  }

}
