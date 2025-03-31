import { Component, inject, input } from '@angular/core';
import { PermissionService } from '../../../commons/services/permission.service';
import { InputComponent } from "../../../commons/components/input/input.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { CreatePermissionPresenter } from './create-permission.presenter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Permission } from '../../../commons/interfaces/permission';
import { ErrorControlDirective } from '../../../commons/directives/error-control.directive';
import { PaginationResolve } from '../../../commons/interfaces/pagination-resolve';
import { ALERT_CONFIRM_DELETE } from '../../../commons/constants/alerts/alert-confirm-delete';
import { ALERT_SUCCESS_DELETE } from '../../../commons/constants/alerts/alert-success-delete';
import { PaginationComponent } from "../../../commons/components/pagination/pagination.component";
import { PermissionType } from '../../../commons/enum/permission-type';
import { HttpMethods } from '../../../commons/enum/http-methods';
import { PermissionTypeIcon } from '../../../commons/constants/icons/permission-type.icon';


@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ErrorControlDirective,
    PaginationComponent
  ],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export default class PermissionComponent {

  route = inject(ActivatedRoute);
  router = inject(Router);
  perrmisionService = inject(PermissionService);
  permissionPresenter = inject(CreatePermissionPresenter);
  paginationResolve$ = new Observable<PaginationResolve<Permission[]>>();
  // @ts-ignore
  parentId = input('');
  permissionSelected: Permission | undefined;

  permissionType = PermissionType;
  httpMethods = HttpMethods;
  icons = PermissionTypeIcon;

  constructor() {
    this.route.paramMap.subscribe(query => this.paginationResolve$ = this.perrmisionService.AllByGroup(query.get('parentId') || ''));
  }

  goChild(parentId: string) {
    this.permissionPresenter.reset();
    return this.router.navigate(['managment', 'permissions', parentId]);
  }

  onDelete(id: string) {

    Swal.fire(ALERT_CONFIRM_DELETE)
      .then(result => result.isConfirmed)
      .then(confirmed => {
        if (confirmed) {
          this.perrmisionService.delete(id).subscribe({
            next: () => {
              this.paginationResolve$ = this.perrmisionService.AllByGroup(this.parentId() || '');
              Swal.fire(ALERT_SUCCESS_DELETE);
            },
            error: (e) => Swal.fire("Ups!", Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error')
          });
        }
      });
  }

  onSave() {
    
    if (this.permissionPresenter.form.valid) {
      this.perrmisionService.save({
        ...this.permissionPresenter.value,
        parentId: this.parentId()
      }).subscribe({
        next: () => {
          this.onClean();
          this.paginationResolve$ = this.perrmisionService.AllByGroup(this.parentId() || '');
          Swal.fire({
            title: 'Permission created!',
            text: '',
            icon: 'success',
            draggable: true
          });
        },
        error: (e) => Swal.fire("Ups!", Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error')
      });
    }
  }

  onUpdate() {
    if (this.permissionPresenter.form.valid) {
      this.perrmisionService.update(this.permissionSelected?.id as string, {
        ...this.permissionPresenter.value,
        parentId: this.parentId()
      }).subscribe({
        next: () => {
          this.onClean();
          this.paginationResolve$ = this.perrmisionService.AllByGroup(this.parentId() || '');
          Swal.fire({
            title: 'Route upated!',
            text: '',
            icon: 'success',
            draggable: true
          });
        },
        error: (e) => {
          Swal.fire("Ups!", Array.isArray(e.error.message[0]) ? e.error.message[0] : e.error.message, 'error');
        }
      });
    }
  }


  onPaginated(page: number) {
    this.paginationResolve$ = this.perrmisionService.AllByGroup(this.parentId(), { page });
  }


  onEdit(permission: Permission) {
    this.permissionSelected = permission;
    this.permissionPresenter.setValue(permission);
  }

  onClean() {
    this.permissionPresenter.reset();
    this.permissionSelected = undefined;
  }


  hasSecondInstance() {
    return this.route.paramMap.pipe(map(query => !query.get('parentId')));
  }

  hasEditOption() {
    return Boolean(this.permissionSelected);
  }


}
