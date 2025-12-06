import { AppSettings } from '@/app/commons/utils/app-settings';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { Permission } from '../../commons/interfaces/permission';
import { permissionToNavbarMenuItem } from '../../commons/mappers/permission-to-navbaritem';
import { AuthService } from '../../commons/services/auth.service';
import { PermissionService } from '../../commons/services/permission.service';

@Component({
  selector: 'bgz-main',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent implements OnInit {
  auth = inject(AuthService);
  plataformId = inject(PLATFORM_ID);
  permissionService = inject(PermissionService);
  permissions = signal<Permission[]>([]);
  navbarItems = computed(() => permissionToNavbarMenuItem(this.permissions() as Permission[]));
  readonly appSettings = AppSettings;

  ngOnInit(): void {

    if (isPlatformBrowser(this.plataformId)) {
      this.permissionService.permissionAuth()
        .subscribe(permissions => this.permissions.set(permissions));
    }
  }

}
