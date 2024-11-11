import { Routes } from '@angular/router';

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
    }

];
