import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { AuthService } from '../../commons/services/auth.service';
import { PermissionService } from '../../commons/services/permission.service';
import { Permission } from '../../commons/interfaces/permission';
import { permissionToNavbarMenuItem } from '../../commons/mappers/permission-to-navbaritem';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-main',
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export default class MainComponent implements OnInit { 
  auth = inject(AuthService);
  permissionService = inject(PermissionService);
  permissions = signal<Permission[]>([]);
  navbarItems = computed(() => permissionToNavbarMenuItem(this.permissions() as Permission[]));
  plataformId = inject(PLATFORM_ID);

  ngOnInit(): void {
  
    if(isPlatformBrowser(this.plataformId)) {
      this.permissionService.permissionAuth()
      .subscribe(permissions => this.permissions.set(permissions));
    }
  }

}
