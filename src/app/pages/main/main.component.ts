import { Component, computed, effect, inject } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { AuthService } from '../../commons/services/auth.service';
import { PermissionService } from '../../commons/services/permission.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Permission } from '../../commons/interfaces/permission';
import { permissionToNavbarMenuItem } from '../../commons/mappers/permission-to-navbaritem';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent {
  auth = inject(AuthService);
  permissionService = inject(PermissionService);
  permissions = toSignal<Permission[]>(this.permissionService.permissionAuth());
  navbarItems = computed(() => permissionToNavbarMenuItem(this.permissions() as Permission[]));

}
