import { Routes } from '@angular/router';
import { checkAuthGuard } from './commons/guards/check-auth.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'blog/:id',
        loadComponent: () => import('./pages/blog/blog.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component'),
        canActivate: [checkAuthGuard]
    },
    {
        path: 'mangment',
        loadComponent: () => import('./pages/managment/managment.component'),
        canActivate: [checkAuthGuard],
        children: [
            {
                path: 'users',
                loadComponent: () => import('./pages/managment/user/user.component')
            },
            {
                path: 'users/create',
                loadComponent: () => import('./pages/managment/user/create-user/create-user.component')
            },
            {
                path: 'roles',
                loadComponent: () => import('./pages/managment/rol/rol.component')   
            },
            {
                path: 'roles/create',
                loadComponent: () => import('./pages/managment/rol/create-role/create-role.component')
            },
            {
                path: 'permissions',
                loadComponent: () => import('./pages/managment/permission/permission.component')
            }
        ]
    },
    {
        path: '403',
        loadComponent: () => import('./pages/errors/error-403/error-403.component')
    },
    {
        path: '**',
        loadComponent: () => import('./pages/errors/error-404/error-404.component')
    }

];
