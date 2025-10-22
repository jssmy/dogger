import { Component } from '@angular/core';
import { FooterComponent } from '../../../commons/components/footer/footer.component';
import { ButtonComponent } from '../../../commons/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-500',
  imports: [FooterComponent, ButtonComponent, RouterLink],
  templateUrl: './error-500.component.html',
  styleUrl: './error-500.component.scss',
})
export default class Error500Component {

}
