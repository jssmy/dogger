import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../commons/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent {
  userService = inject(UserService);
  users = toSignal(this.userService.getUsers());
}
