import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment } from '../../../environments/environment';
import { CreateRoleDto } from '../interfaces/dto/create-role.dto';
import { PaginationResolve } from '../interfaces/pagination-resolve';
import { toQueryParams } from '../utils/string.util';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private readonly http: HttpClient
  ) { }


  getRoles(pagination: {page: number, limit?: number}) {
    const query = toQueryParams(pagination) ;
    return this.http.get<PaginationResolve<Role[]>>(`${environment.role}?${query}`);
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.role}/${id}`);

  }


  create(dto: CreateRoleDto) {
    return this.http.post(environment.role, dto);
  }

  update(id: number, dto: CreateRoleDto) {
    return this.http.put(`${environment.role}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${environment.role}/${id}`);
  }

}
