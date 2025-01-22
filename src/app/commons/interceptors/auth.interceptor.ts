import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService);
  return next(
    req.clone({
      headers: getHeaders(req.headers)
    })
  ).pipe(
    // catchError(() => {
    //   authService.logout();
    //   router.navigate(['/login']).finally();
    //   return throwError(() => new Error('Logout'));
    // })
  );
};

const getHeaders = (headers: HttpHeaders) => {
  const authService = inject(AuthService);
  return headers
    .set('Authorization', `Bearer ${authService.token?.accessToken || 'xxxx'}`);
}
