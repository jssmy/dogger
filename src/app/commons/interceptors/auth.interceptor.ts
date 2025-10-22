import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

let isRefreshing = false;

// URLs que deben ser ignoradas por el interceptor
const IGNORED_URLS: string[] = [
  environment.login,
  environment.createuser,
  environment.requestResetPassword,
  environment.validateTokenResetPassword,
  environment.resetPassword,
  environment.confirmAccount
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verificar si la URL debe ser ignorada
  const shouldIgnore = IGNORED_URLS.some(url => req.url.includes(url));
  
  if (shouldIgnore) {
    return next(req);
  }

  if (req.url.includes(environment.refreshToken)) {
    return next(
      req.clone({
        headers: getHeadersRefresh(req.headers, authService)
      })
    );
  }

  return next(
    req.clone({
      headers: getHeaders(req.headers, authService)
    })
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        if (!isRefreshing) {
          isRefreshing = true;

          return loginService.refresh().pipe(
            switchMap(() => {
              isRefreshing = false;
              return next(
                req.clone({
                  headers: getHeaders(req.headers, authService)
                })
              );
            }),
            catchError((err: HttpErrorResponse) => {
              isRefreshing = false;
              // tokenSubject.next(null);
              router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        } else {
          // Esperar hasta que el token sea refrescado
          return toObservable(authService.token).pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
              next(
                req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${token}`)
                })
              )
            )
          );
        }
      }

      return throwError(() => error);
    })
  );
};

const getHeaders = (headers: HttpHeaders, authService: AuthService) => {
  const token = authService.token()?.accessToken;
  if (!token) {
    throw new Error('No access token available');
  }
  return headers.set('Authorization', `Bearer ${token}`);
};

const getHeadersRefresh = (headers: HttpHeaders, authService: AuthService) => {
  const token = authService.token()?.refreshToken;
  if (!token) {
    throw new Error('No refresh token available');
  }
  return headers.set('Authorization', `Bearer ${token}`);
};
