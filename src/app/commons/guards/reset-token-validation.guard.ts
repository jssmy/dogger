import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const resetTokenValidationGuard: CanActivateFn = (route, __state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return false; // Prevent access on server side
  }


  const token = route.params['token'];
  const router = inject(Router);
  const passwordService = inject(PasswordService);

  if (!token) {
    router.navigate(['/404']);
    return false;
  }

  return passwordService.validateTokenResetPassword(token).pipe(
    map(() => true),
    catchError((error) => {
      if (error.status === 404) {
        router.navigate(['/404']);
      } else if (error.status === 419) {
        router.navigate(['/reset-password-expired']);
      } else {
        router.navigate(['/500']);
      }
      return of(false);
    })
  );
};
