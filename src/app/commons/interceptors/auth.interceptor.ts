import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { environment } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

let isRefreshing = false;

// URLs que deben ser ignoradas por el interceptor
const IGNORED_URLS: string[] = [
  environment.login,
  environment.createuser,
  environment.requestResetPassword,
  environment.validateTokenResetPassword,
  environment.resetPassword,
  environment.confirmAccount,
  `${environment.blog}/public`,
  `${environment.blog}`,
  environment.blogWriter
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  console.log('🌐 [AuthInterceptor] Processing request to:', req.url);
  // Solo aplicar el interceptor en el browser
  if (!isPlatformBrowser(platformId)) {
    console.log('🖥️ [AuthInterceptor] Server-side request, skipping interceptor');
    return next(req);
  }

  // Verificar si la URL debe ser ignorada
  const shouldIgnore = IGNORED_URLS.some(url => url.includes(req.url));
  if (shouldIgnore) {
    console.log('⏭️ [AuthInterceptor] URL ignored, skipping auth:', req.url);
    return next(req);
  }

  console.log('🔐 [AuthInterceptor] Adding authentication to request');

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
      console.log('🚨 [AuthInterceptor] Request failed with status:', error.status);
      if (error.status === HttpStatusCode.Unauthorized) {
        console.log('🔑 [AuthInterceptor] Unauthorized error, attempting token refresh');
        if (!isRefreshing) {
          isRefreshing = true;
          console.log('🔄 [AuthInterceptor] Starting token refresh process');

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
  console.log('🔑 [AuthInterceptor] Getting access token:', token ? 'Token found' : 'No token');
  if (!token) {
    console.error('❌ [AuthInterceptor] No access token available');
    throw new Error('No access token available');
  }
  const newHeaders = headers.set('Authorization', `Bearer ${token}`);
  console.log('✅ [AuthInterceptor] Authorization header added:', `Bearer ${token.substring(0, 20)}...`);
  return newHeaders;
};

const getHeadersRefresh = (headers: HttpHeaders, authService: AuthService) => {
  const token = authService.token()?.refreshToken;
  console.log('🔄 [AuthInterceptor] Getting refresh token:', token ? 'Token found' : 'No token');
  if (!token) {
    console.error('❌ [AuthInterceptor] No refresh token available');
    throw new Error('No refresh token available');
  }
  const newHeaders = headers.set('Authorization', `Bearer ${token}`);
  console.log('✅ [AuthInterceptor] Refresh token header added:', `Bearer ${token.substring(0, 20)}...`);
  return newHeaders;
};
