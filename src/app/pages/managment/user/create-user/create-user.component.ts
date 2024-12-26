import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { CreateUserPresenter } from './create-user.presenter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../commons/services/user.service';
import { RoleService } from '../../../../commons/services/role.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../../../commons/interfaces/role';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent implements OnInit{
  presenter = inject(CreateUserPresenter);
  userService = inject(UserService);
  roleService = inject(RoleService);
  roles: Role[] = [];
  
  ngOnInit(): void {
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  onSave() {
    if (this.presenter.form.valid) {
      this.userService.create(this.presenter.getData())
      .subscribe(data => console.log(data));
    }
  }
}
