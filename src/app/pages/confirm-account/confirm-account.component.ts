import { Component } from '@angular/core';
import { ButtonComponent } from '../../commons/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-confirm-account',
    imports: [ButtonComponent, RouterModule],
    templateUrl: './confirm-account.component.html',
    styleUrl: './confirm-account.component.scss'
})
export default class ConfirmAccountComponent {

}
