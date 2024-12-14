import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Permission } from '../interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private readonly http = inject(HttpClient);
  
  permissionAuth(){
    return this.http.get<Permission[]>(environment.permissionAuth);
  }

}
