import { Environment } from "./environment.model";

export const environment: Environment = {
    mode: 'prod',
    login: 'http://hardcodeando.com:3000/login',
    checkAccessPage: 'http://hardcodeando.com:3000/control-access/page',
    checkAuth: 'http://localhost:3000/control-access',
    permissionAuth: 'http://hardcodeando.com:3000/control-access/permissions',
    user: 'http://hardcodeando.com:3000/user',
    createuser: 'http://hardcodeando.com:3000/register',
    role: 'http://hardcodeando.com:3000/roles',
};
