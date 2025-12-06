import { Component } from '@angular/core';
import { AppSettings } from '../../utils/app-settings';

@Component({
    selector: 'bgz-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly appName = AppSettings.APP_NAME_FORMATTED;
  readonly currentYear = new Date().getFullYear();
}
