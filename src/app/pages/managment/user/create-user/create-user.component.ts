import { Component, inject, OnDestroy } from '@angular/core';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { CreateUserPresenter } from './create-user.presenter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../commons/services/user.service';
import { RoleService } from '../../../../commons/services/role.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { ALERT_SUCCESS_CREATE } from '../../../../commons/constants/alerts/alert-succes-create';

@Component({
    selector: 'bgz-create-user',
    imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent implements OnDestroy {
  presenter = inject(CreateUserPresenter);
  userService = inject(UserService);
  roleService = inject(RoleService);
  paginationResolve = toSignal(this.roleService.getRoles({ page: 1, limit: 9999 }));

  onSave() {
    if (this.presenter.form.valid) {
      this.userService.create(this.presenter.value())
        .subscribe({
          next: () => {
            Swal.fire(ALERT_SUCCESS_CREATE);
            this.presenter.reset();
          },
          error: (e) => Swal.fire("Ups!", Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error')

        });
    }
  }

  ngOnDestroy(): void {
    this.presenter.reset();
  }
}
