import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

let isRefreshing = false;


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService);

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
          // tokenSubject.next(null);

          return loginService.refresh().pipe(
            switchMap((newToken) => {
              isRefreshing = false;
              // tokenSubject.next(newToken.accessToken);

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
  return headers.set(
    'Authorization',
    `Bearer ${authService.token()?.accessToken || 'xxxx'}`
  );
};

const getHeadersRefresh = (headers: HttpHeaders, authService: AuthService) => {
  return headers.set(
    'Authorization',
    `Bearer ${authService.token()?.refreshToken || 'xxxx'}`
  );
};
