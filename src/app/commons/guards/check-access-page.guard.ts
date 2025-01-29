import { CanActivateFn } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';
import { Router } from 'express';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const checkAccessPageGuard: CanActivateFn = (__route, __state) => {

  const checkAccess = inject(CheckAccessService);
  const router = inject(Router);
  return checkAccess.hasAccessPage()
    .pipe(
      map(() => true),
      catchError(err => {
        if (err.status == 401) {
          return of(router.createUrlTree(['/login']));
        } else if (err.status == 403) {
          return of(router.createUrlTree(['/403']));
        } else {
          return of(router.createUrlTree(['/login']));
        }
      })
    );
};
