import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
let countLoadings = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loder = inject(LoaderService);
  countLoadings++;
  loder.active();
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
