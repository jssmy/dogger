import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

let isRefreshing = false;

interface IgnoredUrl { url: string; restrict: boolean };

const IGNORED_URLS: IgnoredUrl[] = [
  { url: environment.login, restrict: true },
  { url: environment.createuser, restrict: true },
  { url: environment.requestResetPassword, restrict: true },
  { url: environment.validateTokenResetPassword, restrict: false },
  { url: environment.resetPassword, restrict: false },
  { url: environment.confirmAccount, restrict: false },
  { url: `${environment.blog}/public`, restrict: false },
  { url: `${environment.blog}`, restrict: true },
  { url: environment.blogWriter, restrict: false }
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const stripPath = (fullUrl: string) => {

    const noDomain = fullUrl.replace(/^https?:\/\/[^/]+/, '');

    const noQuery = noDomain.split('?')[0].split('#')[0];

    return noQuery.replace(/\/+$/, '');
  };

  const reqPath = stripPath(req.url);

  const shouldIgnore = IGNORED_URLS.some(entry => {
    const entryPath = stripPath(entry.url);
    if (entry.restrict) {
      return reqPath === entryPath;
    } else {
      return reqPath === entryPath || reqPath.startsWith(entryPath + '/');
    }
  });

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
  const newHeaders = headers.set('Authorization', `Bearer ${token}`);
  return newHeaders;
};

const getHeadersRefresh = (headers: HttpHeaders, authService: AuthService) => {
  const token = authService.token()?.refreshToken;

  if (!token) {

    throw new Error('No refresh token available');
  }
  const newHeaders = headers.set('Authorization', `Bearer ${token}`);

  return newHeaders;
};
