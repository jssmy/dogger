import { Environment } from "./environment.model";

export const environment: Environment = {
    mode: 'prod',
    login: 'https://user.api.bugzilo.com/login',
    logout: 'https://user.api.bugzilo.com/logout',
    checkAccessPage: 'https://user.api.bugzilo.com/control-access/page',
    checkAuth: 'https://user.api.bugzilo.com/control-access',
    permissionAuth: 'https://user.api.bugzilo.com/control-access/permissions',
    permissions: 'https://user.api.bugzilo.com/permissions',
    user: 'https://user.api.bugzilo.com/user',
    createuser: 'https://user.api.bugzilo.com/register',
    role: 'https://user.api.bugzilo.com/roles',
    confirmAccount: 'https://user.api.bugzilo.com/confirm-account',
    refreshToken: 'https://user.api.bugzilo.com/token/refresh',
    blog: 'https://blog.api.bugzilo.com/api/blog',
    blogWriter: 'https://user.api.bugzilo.com/user',
    requestResetPassword: 'https://user.api.bugzilo.com/password/request',
    validateTokenResetPassword: 'https://user.api.bugzilo.com/password/token',
    resetPassword: 'https://user.api.bugzilo.com/password/change',
};
