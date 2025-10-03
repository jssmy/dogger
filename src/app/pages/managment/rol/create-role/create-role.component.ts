import { Component, inject, input, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { TreeViewComponent } from '../../../../commons/components/tree-view/tree-view.component';
import { PermissionService } from '../../../../commons/services/permission.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { permissionToItem } from '../../../../commons/mappers/permission-to-item';
import { TreeViewItem } from '../../../../commons/interfaces/tree-view-item';
import { CreateRolePresenter } from './create-role.presenter';
import { RoleService } from '../../../../commons/services/role.service';
import { toFlatten } from '../../../../commons/utils/array.util';
import { Role } from '../../../../commons/interfaces/role';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ALERT_SUCCESS_CREATE } from '../../../../commons/constants/alerts/alert-succes-create';
import Swal from 'sweetalert2';
import { ALERT_SUCCESS_UPDATE } from '../../../../commons/constants/alerts/alert-success-update';


@Component({
  selector: 'app-create-role',
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, TreeViewComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
})
export default class CreateRoleComponent implements OnInit, OnDestroy {


  id = input<number>();
  createRolePresenter = inject(CreateRolePresenter);
  permissionService = inject(PermissionService);

  permissions = toSignal<TreeViewItem[]>(this.permissionService.all().pipe(map(permissions => permissionToItem(permissions))));
  roleService = inject(RoleService);
  currentRole = signal<Role | null>(null);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {

    if (this.id() && this.isBrowser) {
      this.roleService.getRole(this.id() as number)
        .subscribe(role => {
          this.currentRole.set(role);
          this.createRolePresenter.init(role);
        });
    }

  }

  ngOnDestroy(): void {
    this.createRolePresenter.init(null);
  }


  onSave() {
    if (this.createRolePresenter.form.valid && !this.currentRole()) {
      this.roleService.create(
        {
          name: this.createRolePresenter.name.value as string,
          permissions: toFlatten('id', this.createRolePresenter.permissions.value as []),
        },
      ).subscribe({
        next: () => {
          Swal.fire(ALERT_SUCCESS_CREATE);
          this.createRolePresenter.init(null);
        },
        error: (e) => Swal.fire('Ups!', Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error'),
      });
    } else if (this.createRolePresenter.form.valid && this.currentRole()) {
      this.roleService.update(
        this.currentRole()?.id as number,
        {
          name: this.createRolePresenter.name.value as string,
          permissions: toFlatten('id', this.createRolePresenter.permissions.value as []),
        },
      ).subscribe({
        next: () => {
          Swal.fire(ALERT_SUCCESS_UPDATE);
        },
        error: (e) => Swal.fire('Ups!', Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error'),
      });
    }
  }
}
