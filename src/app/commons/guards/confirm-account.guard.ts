import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';


export const confirmAccountGuard: CanActivateFn = (route, __state) => {
  const plataformId = inject(PLATFORM_ID);

  if (isPlatformServer(plataformId)) {
    return false; // Permite el acceso en el servidor (puedes modificar esta lógica si es necesario)
  }

  const token = route.params['token'];
  const router = inject(Router);
  const checkAccessService = inject(CheckAccessService);

  return checkAccessService.confirAccount(token).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/403']);
      return of(false);
    }),
  );
};

