import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../commons/services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { ALERT_CONFIRM_DELETE } from '../../../commons/constants/alerts/alert-confirm-delete';
import { ALERT_SUCCESS_DELETE } from '../../../commons/constants/alerts/alert-success-delete';
import { User } from '../../../commons/interfaces/user';
import { PaginationResolve } from '../../../commons/interfaces/pagination-resolve';
import { PaginationComponent } from '../../../commons/components/pagination/pagination.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule, PaginationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent implements OnInit {
  userService = inject(UserService);
  paginationResolve = signal<PaginationResolve<User[]> | undefined>(undefined);
  plataformId = inject(PLATFORM_ID);


  ngOnInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.userService.getUsers(1)
      .subscribe(resolve => this.paginationResolve.set(resolve))

    }
    
  }

  onDelete(id: string) {

    Swal.fire(ALERT_CONFIRM_DELETE)
      .then(result => result.isConfirmed)
      .then(confirmed => {
        if (confirmed) {
          this.userService.delete(id)
            .subscribe({
              next: () => {
                Swal.fire(ALERT_SUCCESS_DELETE);
                this.userService.getUsers()
                  .subscribe(resolve => this.paginationResolve.set(resolve))
              },
              error: (e) => Swal.fire("Ups!", Array.isArray(e.error.message) ? e.error.message[0] : e.error.message, 'error')
            });
        }
      });
  }

  onPaginate(page: number) {
    this.userService.getUsers(page)
    .subscribe(resolve => this.paginationResolve.set(resolve));
  }

}
