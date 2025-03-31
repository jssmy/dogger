import { Routes } from '@angular/router';
import { checkAuthGuard } from './commons/guards/check-auth.guard';
import { confirmAccountGuard } from './commons/guards/confirm-account.guard';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component'),
    },
    {
        path: 'blog/:id',
        loadComponent: () => import('./pages/blog/blog.component'),
    },
    {
        path: 'account-confirmation/:token',
        loadComponent: () => import('./pages/confirm-account/confirm-account.component'),
        canActivate: [confirmAccountGuard]
    },
    {
        path: 'managment',
        loadComponent: () => import('./pages/managment/managment.component'),
        canActivateChild: [checkAuthGuard],
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
                path: 'roles/edit/:id',
                loadComponent: () => import('./pages/managment/rol/create-role/create-role.component')
            },
            {
                path: 'permissions/:parentId',
                loadComponent: () => import('./pages/managment/permission/permission.component')
            },
            {
                path: 'permissions',
                loadComponent: () => import('./pages/managment/permission/permission.component')
            },
            {
                path: 'blog',
                loadComponent: () => import('./pages/managment/blog/blog.component'),
                children: [
                    {
                        path: 'create',
                        loadComponent: () => import('./pages/managment/blog/create-blog/create-blog.component')
                    },
                    {
                        path: 'create/:slug',
                        loadComponent: () => import('./pages/managment/blog/create-blog/create-blog.component')
                    },
                    {
                        path: 'draft/:id',
                        loadComponent: () => import('./pages/managment/blog/draft-blog/draft-blog.component')
                    },
                    {
                        path: 'public/:id',
                        loadComponent: () => import('./pages/managment/blog/public-blog/public-blog.component')
                    }
                ]
            },
            {
                path: 'blog/list',
                loadComponent: () => import('./pages/managment/blog/list-blog/list-blog.component'),
            },

        ]
    },
    {
        path: '403',
        loadComponent: () => import('./pages/errors/error-403/error-403.component'),
        
    },
    {
        path: '**',
        loadComponent: () => import('./pages/errors/error-404/error-404.component')
    }

];
