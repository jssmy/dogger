import { AfterViewInit, Component, inject } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { Auth } from '../../commons/utils/auth';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { AuthService } from '../../commons/services/auth.service';
import { LoaderService } from '../../commons/services/loader.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent {
  auth = inject(AuthService);
  constructor() {
  }

}
