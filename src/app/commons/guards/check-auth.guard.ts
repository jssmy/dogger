import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';
import { catchError, mergeMap, of } from 'rxjs';

export const checkAuthGuard: CanActivateFn = () => {
  const checkAccessService = inject(CheckAccessService);
  const router = inject(Router);
  return checkAccessService.hasValidAuth()
    .pipe(mergeMap(() => of(true)),
      catchError(() => of(router.createUrlTree(['/login']))));

};
