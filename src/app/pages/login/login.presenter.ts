import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Login } from "../../commons/interfaces/login";
import { LOGIN_FORM_CONTROL_ERRORS } from "./login.formcontrol.errors";

@Injectable({
    providedIn: 'root'
})
export class LoginPresenter {
    form: FormGroup;
    usernameControl = new FormControl('');
    passwordControl = new FormControl('');

    ERROR_CONTROL = LOGIN_FORM_CONTROL_ERRORS;

    constructor() {
        this.addValidations();
        this.form = new FormGroup({
            usernameControl: this.usernameControl,
            passwordControl: this.passwordControl
        });
    }

    credentials(): Login {
        return {
            email: String(this.usernameControl.value),
            password: String(this.passwordControl.value)
        }
    }

    private addValidations() {
        this.usernameControl.setValidators([Validators.pattern(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/), Validators.required]);
        this.passwordControl.setValidators([Validators.minLength(8),Validators.required]);
    }

    setCredentialErrorControl() {
        this.passwordControl.setErrors({incorrect: true});
    }

    setEmptyErrorControl() {
        this.passwordControl.setErrors(null);
        this.usernameControl.setErrors(null);
    }
}