import { AppSettings } from '@/app/commons/utils/app-settings';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { Permission } from '../../commons/interfaces/permission';
import { permissionToNavbarMenuItem } from '../../commons/mappers/permission-to-navbaritem';
import { AuthService } from '../../commons/services/auth.service';
import { PermissionService } from '../../commons/services/permission.service';

@Component({
  selector: 'bgz-managment',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './managment.component.html',
  styleUrl: './managment.component.scss'
})
export default class ManagmentComponent {
  auth = inject(AuthService);
  permissionService = inject(PermissionService);
  permissions = toSignal<Permission[]>(this.permissionService.permissionAuth());
  navbarItems = computed(() => permissionToNavbarMenuItem(this.permissions() as Permission[]));
  readonly appSettings = AppSettings;
}
