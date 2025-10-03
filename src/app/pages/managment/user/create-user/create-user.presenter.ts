import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '../../../../commons/interfaces/dto/create-user.dto';


@Injectable({
  providedIn: 'root',
})
export class CreateUserPresenter {
  form: FormGroup;
  nameControl: FormControl = new FormControl<string>('', [Validators.required]);
  lastNameControl = new FormControl<string>('', [Validators.required]);
  emailControl = new FormControl<string>('', [Validators.email]);
  roleControl = new FormControl<number>(1, [Validators.required]);

  constructor() {
    this.form = new FormGroup({
      name: this.nameControl,
      lastname: this.lastNameControl,
      email: this.emailControl,
      role: this.roleControl,
    });
  }

  value(): CreateUserDto {
    return {
      name: String(this.nameControl.value),
      surnames: String(this.lastNameControl.value),
      email: String(this.emailControl.value),
      roleId: Number(this.roleControl.value),
    };
  }

  reset() {
    this.nameControl.setValue('');
    this.lastNameControl.setValue('');
    this.emailControl.setValue('');
    this.roleControl.setValue(1);
  }
}
