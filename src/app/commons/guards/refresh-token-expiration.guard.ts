import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JWT } from '../utils/jwt.util';
import { isPlatformServer } from '@angular/common';

export const refreshTokenExpirationGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  // En el servidor, permitir el acceso
  if (isPlatformServer(platformId)) {
    return true;
  }

  // Si no hay datos de sesión, redirigir al login
  if (!authService.check()) {
    authService.logout();
    return router.createUrlTree(['/login']);
  }

  const token = authService.token();

  // Si no hay token o refresh token, redirigir al login
  if (!token || !token.refreshToken) {
    authService.logout();
    return router.createUrlTree(['/login']);
  }

  try {
    // Decodificar el refresh token para obtener la fecha de expiración
    const decodedToken = JWT.decode<{ exp: number }>(token.refreshToken);

    if (!decodedToken || !decodedToken.exp) {
      // Si no se puede decodificar o no tiene expiración, redirigir al login
      authService.logout();
      return router.createUrlTree(['/login']);
    }

    // Convertir la fecha de expiración (timestamp en segundos) a milisegundos
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    // Si el refresh token ha expirado, redirigir al login
    if (currentTime >= expirationTime) {
      authService.logout();
      return router.createUrlTree(['/login']);
    }

    // El refresh token es válido, permitir el acceso
    return true;

  } catch (error) {
    // Si hay algún error al decodificar el token, redirigir al login
    console.error('Error decoding refresh token:', error);
    authService.logout();
    return router.createUrlTree(['/login']);
  }
};
