import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(environment.user);
  }

  create(user: User) {
    return this.http.post(environment.user, user);
  }

}
