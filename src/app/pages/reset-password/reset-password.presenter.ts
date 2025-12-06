import { Injectable, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { PasswordStrengthService } from "../../commons/services/password-strength.service";
import { RESET_PASSWORD_FORM_CONTROL_ERRORS } from "./reset-password.formcontrol.errors";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordPresenter {
    readonly form: FormGroup;
    readonly passwordControl = new FormControl('');

    readonly ERROR_CONTROL = RESET_PASSWORD_FORM_CONTROL_ERRORS;
    private readonly passwordStrengthService = inject(PasswordStrengthService);

    // Reactive signals for password strength
    readonly passwordValue = toSignal(this.passwordControl.valueChanges, { initialValue: '' });
    readonly passwordStrength = computed(() => {
        const password = this.passwordValue();
        if (!password) return 0;
        return this.passwordStrengthService.calculateStrength(password);
    });

    readonly passwordStrengthLevel = computed(() => {
        const password = this.passwordValue();
        if (!password) return 'easy' as const;
        return this.passwordStrengthService.getStrengthLevel(password);
    });

    constructor() {
        this.addValidations();
        this.form = new FormGroup({
            passwordControl: this.passwordControl,
        }, { validators: this.passwordMatchValidator });
    }

    passwordData(): { password: string; confirmPassword: string } {
        return {
            password: String(this.passwordControl.value),
            confirmPassword: String(this.passwordControl.value)
        };
    }

    private addValidations(): void {
        this.passwordControl.setValidators([
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator.bind(this)
        ]);
    }

    private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.value;
        if (!password) return null;

        const strength = this.passwordStrengthService.calculateStrength(password);
        if (strength < 3) {
            return { weakPassword: true };
        }
        return null;
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('passwordControl')?.value;
        const confirmPassword = control.get('confirmPasswordControl')?.value;

        if (password && confirmPassword && password !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null;
    }

    getPasswordStrength(): number {
        return this.passwordStrength();
    }

    getPasswordStrengthLevel(): 'easy' | 'medium' | 'hard' {
        return this.passwordStrengthLevel();
    }

    setPasswordErrorControl(): void {
        this.passwordControl.setErrors({ weakPassword: true });
    }


    setEmptyErrorControl(): void {
        this.passwordControl.setErrors(null);
    }
}
