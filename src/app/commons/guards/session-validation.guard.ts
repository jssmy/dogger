import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JWT } from '../utils/jwt.util';
import { isPlatformServer } from '@angular/common';
import Swal from 'sweetalert2';

export const sessionValidationGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  // En el servidor, permitir el acceso
  if (isPlatformServer(platformId)) {
    return true;
  }

  // Verificar si hay información de sesión
  if (!authService.check()) {
    return true; // No hay sesión, permitir acceso a la página home
  }

  const token = authService.token();

  // Si no hay token o refresh token, permitir acceso
  if (!token || !token.refreshToken) {
    return true;
  }

  try {
    // Decodificar el refresh token para obtener la fecha de expiración
    const decodedToken = JWT.decode<{ exp: number }>(token.refreshToken);

    if (!decodedToken || !decodedToken.exp) {
      return true; // No se puede decodificar, permitir acceso
    }

    // Convertir la fecha de expiración (timestamp en segundos) a milisegundos
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    // Si el refresh token ha expirado, mostrar alerta y hacer logout
    if (currentTime >= expirationTime) {
      showSessionExpiredAlert(authService, router);
      return false; // Bloquear acceso temporalmente
    }

    // El refresh token es válido, permitir el acceso
    return true;

  } catch (error) {
    console.error('Error validating session:', error);
    return true; // En caso de error, permitir acceso
  }
};

function showSessionExpiredAlert(authService: AuthService, router: Router): void {
  Swal.fire({
    title: 'Sesión Expirada',
    text: 'Tu sesión ha expirado. Serás redirigido al login.',
    icon: 'warning',
    confirmButtonText: 'Entendido',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: true,
    confirmButtonColor: '#3085d6',
  }).then(() => {
    // Hacer logout y redirigir al login
    authService.logout();
    router.navigate(['/login']);
  });
}
