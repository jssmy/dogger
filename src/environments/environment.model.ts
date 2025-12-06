export interface Environment {
    mode: 'prod' | 'dev' | 'local';
    login: string;
    logout: string;
    checkAccessPage: string;
    checkAuth: string;
    permissionAuth: string;
    permissions: string;
    user: string;
    createuser: string;
    role: string;
    confirmAccount: string;
    blog: string;
    blogWriter: string;
    refreshToken: string;
    requestResetPassword: string;
    validateTokenResetPassword: string;
    resetPassword: string;


}