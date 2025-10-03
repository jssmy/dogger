import { CanActivateFn } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';
import { Router } from 'express';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const checkAccessPageGuard: CanActivateFn = (_route, _state) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  if (isBrowser) {
    return false;
  }

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
        }
        return of(router.createUrlTree(['/login']));

      }),
    );
};
