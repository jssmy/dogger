import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleService } from '../../../commons/services/role.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export  default class RolComponent {

  roleService = inject(RoleService);
  roles = toSignal(this.roleService.getRoles());

}
