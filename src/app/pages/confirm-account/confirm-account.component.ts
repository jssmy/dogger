import { Component } from '@angular/core';
import { ButtonComponent } from '../../commons/components/button/button.component';

@Component({
  selector: 'app-confirm-account',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export default class ConfirmAccountComponent {

}
