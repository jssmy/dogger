import { Component, computed, inject } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { AuthService } from '../../commons/services/auth.service';
import { PermissionService } from '../../commons/services/permission.service';
import { Permission } from '../../commons/interfaces/permission';
import { toSignal } from '@angular/core/rxjs-interop';
import { permissionToNavbarMenuItem } from '../../commons/components/mappers/permission-to-navbaritem';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-managment',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './managment.component.html',
  styleUrl: './managment.component.scss'
})
export default class ManagmentComponent {
  auth = inject(AuthService);
  permissionService = inject(PermissionService);
  permissions = toSignal<Permission[]>(this.permissionService.permissionAuth());
  navbarItems = computed(() => permissionToNavbarMenuItem(this.permissions() as Permission[]));
}
