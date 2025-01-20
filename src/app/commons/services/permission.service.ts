import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Permission } from '../interfaces/permission';
import { map, mergeMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginationResolve } from '../interfaces/pagination-resolve';
import { URLSearchParams } from 'node:url';
import { query } from 'express';
import { toQueryParams } from '../utils/string.util';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private readonly http = inject(HttpClient);

  permissionAuth() {
    return this.http.get<Permission[]>(environment.permissionAuth)
    .pipe(map(permission => {
      const parents = permission.filter(parent => !parent.parentId);
      const children = permission.filter(child => child.parentId);

      return  parents.map(parent => ({
        ...parent,
        children: children.filter(child => child.parentId === parent.id)
      }) as Permission);

    }));
  }

  all() {
    return this.http.get<Permission[]>(`${environment.permissions}`);
  }


  AllByGroup(parentId: string | undefined, pagination?: { page: number, limit?: number }) {
    const query = toQueryParams(pagination) ;
    return this.http.get<PaginationResolve<Permission[]>>(`${environment.permissions}/parent/${parentId}?${query}`);
  }

  delete(id: string) {
    return this.http.delete(`${environment.permissions}/${id}`);
  }

  save(permission: Permission) {
    return this.http.post(environment.permissions, permission);
  }


  update(id: string,permission: Permission) {
    return this.http.put(`${environment.permissions}/${id}`, permission);
  }

}
