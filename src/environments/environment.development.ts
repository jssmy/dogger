import { Environment } from "./environment.model";

export const environment: Environment = {
    mode: 'dev',
    login: 'http://localhost:3000/login',
    checkAccessPage: 'http://localhost:3000/control-access/page',
    checkAuth: 'http://localhost:3000/control-access',
    permissionAuth: 'http://localhost:3000/control-access/permissions',
    user: 'http://localhost:3000/user',
    createuser: 'http://localhost:3000/register'
};
