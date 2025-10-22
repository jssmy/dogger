import { Environment } from "./environment.model";

export const environment: Environment = {
    mode: 'prod',
    login: 'http://hardcodeando.com:3000/login',
    logout: 'http://hardcodeando.com:3000/logout',
    checkAccessPage: 'http://hardcodeando.com:3000/control-access/page',
    checkAuth: 'http://hardcodeando.com:3000/control-access',
    permissionAuth: 'http://hardcodeando.com:3000/control-access/permissions',
    permissions: 'http://hardcodeando.com:3000/permissions',
    user: 'http://hardcodeando.com:3000/user',
    createuser: 'http://hardcodeando.com:3000/register',
    role: 'http://hardcodeando.com:3000/roles',
    confirmAccount: 'http://hardcodeando.com:3000/confirm-account',
    refreshToken: 'http://hardcodeando.com:3000/token/refresh',
    blog: 'http://hardcodeando.com:3001/api/blog',
    blogWriter: 'http://hardcodeando.com:3000/user',
    requestResetPassword: 'http://hardcodeando.com:3000/password/request',
    validateTokenResetPassword: 'http://hardcodeando.com:3000/password/token',
    resetPassword: 'http://hardcodeando.com:3000/password/change',
};
