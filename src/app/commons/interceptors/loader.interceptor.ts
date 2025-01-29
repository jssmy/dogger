import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

import { NOT_LOADER_INTERCEPTOR } from './constants/not-loader-url';
let countLoadings = 0;


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loder = inject(LoaderService);
  countLoadings++;
  loder.active();


  if (NOT_LOADER_INTERCEPTOR.includes(req.url)) {
    return next(req);
  }


  return next(req)
    .pipe(
      tap(() => {
        countLoadings--;
        if (countLoadings <= 0) {
          loder.inactive();
        }
      })
    );
};
