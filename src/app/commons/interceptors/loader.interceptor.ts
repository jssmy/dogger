import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { NOT_LOADER_INTERCEPTOR } from './constants/not-loader-url';
let countLoadings = 0;


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loder = inject(LoaderService);

  if (NOT_LOADER_INTERCEPTOR.some( url => req.url.includes(url))) {
    return next(req);
  }

  countLoadings++;

  loder.active();

  return next(req)
    .pipe(
      tap(() => {
        countLoadings--;
        if (countLoadings <= 0) {
          loder.inactive();
        }
      }),
    );
};
