import { Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FORGOT_PASSWORD_FORM_CONTROL_ERRORS } from "./forgot-password.formcontrol.errors";

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordPresenter {
    readonly form: FormGroup;
    readonly emailControl = new FormControl('');

    readonly ERROR_CONTROL = FORGOT_PASSWORD_FORM_CONTROL_ERRORS;

    // Reactive signal for email value
    readonly emailValue = toSignal(this.emailControl.valueChanges, { initialValue: '' });

    constructor() {
        this.addValidations();
        this.form = new FormGroup({
            emailControl: this.emailControl
        });
    }

    private addValidations(): void {
        this.emailControl.setValidators([
            Validators.required,
            Validators.email,
            Validators.pattern(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        ]);
    }

    setEmailErrorControl(): void {
        this.emailControl.setErrors({ userNotFound: true });
    }

    setEmptyErrorControl(): void {
        this.emailControl.setErrors(null);
    }
}
