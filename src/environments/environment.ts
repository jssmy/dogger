import { Environment } from './environment.model';

export const environment: Environment = {
  mode: 'local',
  login: 'http://localhost:3000/login',
  logout: 'http://localhost:3000/logout',
  checkAccessPage: 'http://localhost:3000/control-access/page',
  checkAuth: 'http://localhost:3000/control-access',
  permissionAuth: 'http://localhost:3000/control-access/permissions',
  permissions: 'http://localhost:3000/permissions',
  user: 'http://localhost:3000/user',
  createuser: 'http://localhost:3000/register',
  role: 'http://localhost:3000/roles',
  confirmAccount: 'http://localhost:3000/confirm-account',
  refreshToken: 'http://localhost:3000/token/refresh',
  blog: 'http://localhost:3001/api/blog',
  blogWriter: 'http://localhost:3000/user',
};
