import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';
import { CreateUserDto } from '../interfaces/dto/create-user.dto';
import { PaginationResolve } from '../interfaces/pagination-resolve';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);



  getUsers(page = 1, limit = 10) {
    return this.http.get<PaginationResolve<User[]>>(`${environment.user}?page=${page}&limit=${limit}`);
  }

  create(user: CreateUserDto) {
    return this.http.post(environment.createuser, user);
  }

  delete(id: string) {
    return this.http.delete(`${environment.user}/${id}`);
  }

}
