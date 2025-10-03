import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PERMISSION_FORM_CONTROL_ERRORS } from './permission.formcontrol.errors';
import { Permission } from '../../../commons/interfaces/permission';
import { trim } from '../../../commons/utils/string.util';
import { HttpMethods } from '../../../commons/enum/http-methods';
import { PermissionType } from '../../../commons/enum/permission-type';

@Injectable({
  providedIn: 'root',
})
export class CreatePermissionPresenter {


  name = new FormControl<string | null>(null, [Validators.required]);
  path = new FormControl<string | null>({ disabled: true, value: null }, [Validators.required]);
  method = new FormControl<HttpMethods>({ disabled: true, value: HttpMethods.GET }, [Validators.required]);
  type = new FormControl<PermissionType>(PermissionType.GROUP, [Validators.required]);
  form!: FormGroup;
  ERROR_CONTROL = PERMISSION_FORM_CONTROL_ERRORS;
  constructor() {
    this.form = new FormGroup({
      name: this.name,
      path: this.path,
      method: this.method,
      type: this.type,
    });
  }

  get value(): Permission {
    return {
      method: this.method.disabled ? undefined : this.method.value,
      name: (this.name.value || '').trim(),
      route: this.path.disabled ? undefined : `/${trim(this.path.value || '', '/')}`,
      type: this.type.value,
      parentId: '',
      order: 0,
    } as Permission;
  }

  reset() {
    this.name.setValue('');
    this.path.setValue(null);
    this.method.setValue(HttpMethods.GET);
    this.type.setValue(PermissionType.GROUP);
    this.onChangeType();
  }


  onChangeType() {
    const type = this.type.value as PermissionType;

    if ([PermissionType.GROUP].includes(type)) {
      this.path.setValue(null);
      this.path.disable();
      this.method.disable();
      this.method.setValue(HttpMethods.GET);

    } else if ([PermissionType.MENU].includes(type)) {
      this.method.disable();
      this.method.setValue(HttpMethods.GET);
      this.path.enable();
    } else if ([PermissionType.OPTION].includes(type)) {
      this.method.disable();
      this.method.setValue(HttpMethods.GET);
      this.path.enable();
      this.path.clearValidators();
      this.path.setErrors(null);
    } else {
      this.path.enable();
      this.method.enable();
    }
  }

  setValue(permission: Permission) {
    this.name.setValue(permission.name);
    this.method.setValue(permission.method ?? HttpMethods.GET);
    this.type.setValue(permission.type);
    this.path.setValue(permission.route);
    this.onChangeType();
  }


}
