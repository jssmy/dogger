export const RESET_PASSWORD_FORM_CONTROL_ERRORS = {
    password: {
        required: 'Password is required',
        minlength: 'Password must be at least 8 characters',
        weakPassword: 'Password is too weak. Please use a stronger password'
    },
    confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords do not match'
    }
}
