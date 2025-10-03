import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Permission } from '../interfaces/permission';
import { map, mergeMap, of, tap } from 'rxjs';
import { PaginationResolve } from '../interfaces/pagination-resolve';
import { toQueryParams } from '../utils/string.util';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  private isPlatformBrowser = of(isPlatformBrowser(inject(PLATFORM_ID)));

  private readonly http = inject(HttpClient);

  permissionAuth() {
    return this.isPlatformBrowser
      .pipe(
        mergeMap(isBrowser => {
          if (isBrowser) {

            const permission = (JSON.parse(localStorage.getItem('auth-permissions') || '[]')) as Permission[];

            if (permission.length > 0) {
              return of(permission);
            }
            return this.http.get<Permission[]>(environment.permissionAuth)
              .pipe(
                map(permission => {
                  const parents = permission.filter(parent => !parent.parentId);
                  const children = permission.filter(child => child.parentId);

                  return parents.map(parent => ({
                    ...parent,
                    children: children.filter(child => child.parentId === parent.id),
                  }) as Permission);

                }),
                tap(permission => localStorage.setItem('auth-permissions', JSON.stringify(permission))),
              );
          }

          return [];
        }),
      );

  }

  all() {
    return this.http.get<Permission[]>(`${environment.permissions}`);
  }


  AllByGroup(parentId: string | undefined, pagination?: { page: number, limit?: number }) {

    return this.isPlatformBrowser
      .pipe(
        mergeMap(isBrowser => {

          if (isBrowser) {
            const query = toQueryParams(pagination);
            return this.http.get<PaginationResolve<Permission[]>>(`${environment.permissions}/parent/${parentId}?${query}`);
          }

          return [];

        }),
      );


  }

  delete(id: string) {
    return this.http.delete(`${environment.permissions}/${id}`);
  }

  save(permission: Permission) {
    return this.http.post(environment.permissions, permission);
  }


  update(id: string, permission: Permission) {
    return this.http.put(`${environment.permissions}/${id}`, permission);
  }

}
