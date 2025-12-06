import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './commons/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './commons/services/loader.service';
import { AppSettings } from './commons/utils/app-settings';

@Component({
    selector: 'bgz-root',
    imports: [
        LoaderComponent,
        RouterOutlet,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = AppSettings.APP_NAME_FORMATTED;

  

  constructor(
    readonly loader: LoaderService
  ) {}
}
