import { Routes } from '@angular/router';
import { checkAuthGuard } from './commons/guards/check-auth.guard';
import { confirmAccountGuard } from './commons/guards/confirm-account.guard';
import { refreshTokenExpirationGuard } from './commons/guards/refresh-token-expiration.guard';
import { resetTokenValidationGuard } from './commons/guards/reset-token-validation.guard';
import { sessionValidationGuard } from './commons/guards/session-validation.guard';
import { AppSettings } from './commons/utils/app-settings';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
        canActivate: [sessionValidationGuard],
        title: AppSettings.APP_NAME_FORMATTED
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
        title: `${AppSettings.PREFIX} | Iniciar sesión`
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/main/main.component'),
        title: `${AppSettings.PREFIX} | Inicio`
    },
    {
        path: 'blog/:id',
        loadComponent: () => import('./pages/blog/blog.component'),
        title: `${AppSettings.PREFIX} | Blog`,
    },
    {
        path: 'account-confirmation/:token',
        loadComponent: () => import('./pages/confirm-account/confirm-account.component'),
        canActivate: [confirmAccountGuard],
        title: `${AppSettings.PREFIX} | Confirmar cuenta`
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/forgot-password/forgot-password.component'),
        title: `${AppSettings.PREFIX} | Olvidé mi contraseña`
    },
    {
        path: 'forgot-password-confirmation',
        loadComponent: () => import('./pages/forgot-password-confirmation/forgot-password-confirmation.component'),
        title: `${AppSettings.PREFIX} | Confirmación de olvidé mi contraseña`
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./pages/reset-password/reset-password.component'),
        canActivate: [resetTokenValidationGuard],
        title: `${AppSettings.PREFIX} | Reiniciar contraseña`
    },
    {
        path: 'reset-password-expired',
        loadComponent: () => import('./pages/reset-password-expired/reset-password-expired.component'),
        title: `${AppSettings.PREFIX} | Expiración de contraseña`
    },
    {
        path: 'managment',
        loadComponent: () => import('./pages/managment/managment.component'),
        canActivateChild: [refreshTokenExpirationGuard, checkAuthGuard],
        title: `${AppSettings.PREFIX} | Gestión`,
        children: [
            {
                path: 'users',
                loadComponent: () => import('./pages/managment/user/user.component'),
                title: `${AppSettings.PREFIX} | Usuarios`
            },
            {
                path: 'users/create',
                loadComponent: () => import('./pages/managment/user/create-user/create-user.component'),
                title: `${AppSettings.PREFIX} | Crear usuario`
            },
            {
                path: 'roles',
                loadComponent: () => import('./pages/managment/rol/rol.component'),
                title: `${AppSettings.PREFIX} | Roles`
            },
            {
                path: 'roles/create',
                loadComponent: () => import('./pages/managment/rol/create-role/create-role.component'),
                title: `${AppSettings.PREFIX} | Crear rol`
            },
            {
                path: 'roles/edit/:id',
                loadComponent: () => import('./pages/managment/rol/create-role/create-role.component'),
                title: `${AppSettings.PREFIX} | Editar rol`
            },
            {
                path: 'permissions/:parentId',
                loadComponent: () => import('./pages/managment/permission/permission.component'),
                title: `${AppSettings.PREFIX} | Permisos`
            },
            {
                path: 'permissions',
                loadComponent: () => import('./pages/managment/permission/permission.component'),
                title: `${AppSettings.PREFIX} | Permisos`
            },
            {
                path: 'blog',
                loadComponent: () => import('./pages/managment/blog/blog.component'),
                title: `${AppSettings.PREFIX} | Blog`,
                children: [
                    {
                        path: 'create',
                        loadComponent: () => import('./pages/managment/blog/create-blog/create-blog.component'),
                        title: `${AppSettings.PREFIX} | Crear blog`
                    },
                    {
                        path: 'create/:slug',
                        loadComponent: () => import('./pages/managment/blog/create-blog/create-blog.component'),
                        title: `${AppSettings.PREFIX} | Crear blog`
                    },
                    {
                        path: 'draft/:id',
                        loadComponent: () => import('./pages/managment/blog/draft-blog/draft-blog.component'),
                        title: `${AppSettings.PREFIX} | Borrador de blog`
                    },
                    {
                        path: 'public/:id',
                        loadComponent: () => import('./pages/managment/blog/public-blog/public-blog.component'),
                        title: `${AppSettings.PREFIX} | Publicar blog`
                    }
                ]
            },
            {
                path: 'blog/list',
                loadComponent: () => import('./pages/managment/blog/list-blog/list-blog.component'),
                title: `${AppSettings.PREFIX} | Listado de blogs`
            },

        ]
    },
    {
        path: '403',
        loadComponent: () => import('./pages/errors/error-403/error-403.component'),
        title: `${AppSettings.PREFIX} | Acceso denegado`
    },
    {
        path: '404',
        loadComponent: () => import('./pages/errors/error-404/error-404.component'),
        title: `${AppSettings.PREFIX} | Página no encontrada`
    },
    {
        path: '500',
        loadComponent: () => import('./pages/errors/error-500/error-500.component'),
        title: `${AppSettings.PREFIX} | Error del servidor`
    },
    {
        path: '**',
        loadComponent: () => import('./pages/errors/error-404/error-404.component'),
        title: `${AppSettings.PREFIX} | Página no encontrada`
    }

];
