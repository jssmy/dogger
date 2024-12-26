import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../commons/components/input/input.component';
import { ButtonComponent } from '../../../../commons/components/button/button.component';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [FormsModule, InputComponent, ButtonComponent],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export default class CreateRoleComponent {

}
