import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeViewItem } from '../../../../commons/interfaces/tree-view-item';
import { Role } from '../../../../commons/interfaces/role';
import { permissionToItem } from '../../../../commons/mappers/permission-to-item';

@Injectable({
  providedIn: 'root',
})
export class CreateRolePresenter {


  name = new FormControl<string>('', [Validators.required]);
  permissions = new FormControl<TreeViewItem[]>([], [Validators.required]);

  form: FormGroup = new FormGroup({
    name: this.name,
    permissions: this.permissions,
  });

  init(role: Role | null) {
    this.name.enable();
    if (role?.protected) {
      this.name.disable();
    }
    this.name.setValue(role?.name || '');
    this.permissions.setValue(permissionToItem(role?.permissions || []));
  }

}
