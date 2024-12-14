import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "../../../../commons/interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class CreateUserPresenter {
    form: FormGroup;
    nameControl: FormControl = new FormControl();
    lastNameControl = new FormControl();
    emailControl = new FormControl();
    roleControl = new FormControl();

    constructor() {
        this.form = new FormGroup({
            name: this.nameControl,
            lastname: this.lastNameControl,
            email: this.emailControl,
            role: this.roleControl
        });
    }

    getData(): User {
        return {
            name: this.nameControl.value,
            surnames: this.lastNameControl.value,
            email: this.emailControl.value
        } as User;
    }
}