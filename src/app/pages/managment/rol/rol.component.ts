import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleService } from '../../../commons/services/role.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ALERT_CONFIRM_DELETE } from '../../../commons/constants/alerts/alert-confirm-delete';
import { ALERT_SUCCESS_DELETE } from '../../../commons/constants/alerts/alert-success-delete';
import { PaginationComponent } from '../../../commons/components/pagination/pagination.component';
import { Role } from '../../../commons/interfaces/role';
import { Observable } from 'rxjs';
import { PaginationResolve } from '../../../commons/interfaces/pagination-resolve';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export default class RolComponent implements OnInit {

  roleService = inject(RoleService);
  paginationRoles = signal<PaginationResolve<Role[]> | undefined>(undefined);
  ngOnInit(): void {

    this.roleService.getRoles({ page: 1 })
      .subscribe(resolve => this.paginationRoles.set(resolve));
  }

  onDelete(id: number) {

    Swal.fire(ALERT_CONFIRM_DELETE)
      .then(result => result.isConfirmed)
      .then(confirmed => {
        if (confirmed) {
          this.roleService.delete(id)
            .subscribe({
              next: () => {
                Swal.fire(ALERT_SUCCESS_DELETE);
                this.roleService.getRoles({ page: 1 })
                  .subscribe(resolve => this.paginationRoles.set(resolve));
              },
              error: (e) => Swal.fire("Ups!",  Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error')
            });
        }
      });
  }

  onPaginated(page: number) {
    this.roleService.getRoles({ page })
      .subscribe(resolve => this.paginationRoles.set(resolve));
  }


}
