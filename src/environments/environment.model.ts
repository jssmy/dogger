export interface Environment {
    mode: 'prod' | 'dev' | 'local';
    login: string;
    checkAccessPage: string;
    checkAuth: string;
    permissionAuth: string;
    user: string;
    createuser: string;
    role: string;

}