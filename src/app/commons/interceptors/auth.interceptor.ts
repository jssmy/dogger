import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  return next(
    req.clone({
      headers: getHeaders(req.headers)
    })
  );
};

const getHeaders = (headers: HttpHeaders) => {
  const authService = inject(AuthService);
  return headers
    .set('Authorization', `Bearer ${authService.token()?.accessToken || 'xxxx'}`);
}
