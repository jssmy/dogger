import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PasswordResetService } from '../services/password-reset.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const resetTokenValidationGuard: CanActivateFn = (route, __state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return false; // Prevent access on server side
  }

  const token = route.params['token'];
  const router = inject(Router);
  const passwordResetService = inject(PasswordResetService);

  if (!token) {
    router.navigate(['/404']);
    return false;
  }

  return passwordResetService.validateToken(token).pipe(
    map((isValid: boolean) => {
      if (isValid) {
        return true; // Allow access to reset-password page
      }
      router.navigate(['/reset-password-expired']);
      return false;

    }),
    catchError((error) => {
      console.error('Token validation error:', error);
      if (error.status === 404) {
        router.navigate(['/404']);
      } else {
        router.navigate(['/reset-password-expired']);
      }
      return of(false);
    }),
  );
};
