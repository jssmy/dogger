import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment } from '../../../environments/environment';
import { CreateRoleDto } from '../interfaces/dto/create-role.dto';
import { PaginationResolve } from '../interfaces/pagination-resolve';
import { toQueryParams } from '../utils/string.util';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private  isPlatformBrowser = of(isPlatformBrowser(inject(PLATFORM_ID)));
  constructor(
    private readonly http: HttpClient
  ) { }


  getRoles(pagination: {page: number, limit?: number}) {


    return this.isPlatformBrowser
    .pipe(
      mergeMap(isBrowser => {

        if (isBrowser) {
          const query = toQueryParams(pagination) ;
          return this.http.get<PaginationResolve<Role[]>>(`${environment.role}?${query}`);
        }

        return [];
      })
    )
    
    
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
