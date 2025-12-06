import { AppSettings } from '@/app/commons/utils/app-settings';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../commons/components/button/button.component';

@Component({
    selector: 'bgz-confirm-account',
    imports: [ButtonComponent, RouterModule],
    templateUrl: './confirm-account.component.html',
    styleUrl: './confirm-account.component.scss'
})
export default class ConfirmAccountComponent {

    readonly appSettings = AppSettings;

}
