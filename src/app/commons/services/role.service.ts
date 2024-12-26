import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private readonly http: HttpClient
  ) { }


  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.role);
  }

}
