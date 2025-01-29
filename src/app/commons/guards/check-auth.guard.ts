import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';
import { catchError, mergeMap, of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

export const checkAuthGuard: CanActivateFn = () => {

  const plataformId = inject(PLATFORM_ID);

  if (isPlatformServer(plataformId)) {
    return false; // Permite el acceso en el servidor (puedes modificar esta lógica si es necesario)
  }

  const checkAccessService = inject(CheckAccessService);
  const router = inject(Router);
  return checkAccessService.hasValidAuth()
    .pipe(
      mergeMap(() => of(true)),
      catchError(err => {
        alert('estoy en el guard')
        if (err.status === HttpStatusCode.Unauthorized) {
          return of(router.createUrlTree(['/login']));
        } else if (err.status === HttpStatusCode.Forbidden) {
          return of(router.createUrlTree(['/403']));
        }
        return of(router.createUrlTree(['/login']));
      }));

};
