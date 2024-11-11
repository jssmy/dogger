import { Component } from '@angular/core';
import { InputComponent } from '../../commons/components/input/input.component';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { LoaderService } from '../../commons/services/loader.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  
  constructor(
    readonly loader: LoaderService
  ) {
    // timer(1000).subscribe(() => this.loader.inactive());
  }

  login() {
    this.loader.active();
    timer(2000).subscribe(() => this.loader.inactive());
  }

}
