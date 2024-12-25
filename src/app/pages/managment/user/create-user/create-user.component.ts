import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { CreateUserPresenter } from './create-user.presenter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../commons/services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent {
  presenter = inject(CreateUserPresenter);
  userService = inject(UserService);

  onSave() {
    if (this.presenter.form.valid) {
      this.userService.create(this.presenter.getData())
      .subscribe(data => console.log(data));
    }
  }
}
