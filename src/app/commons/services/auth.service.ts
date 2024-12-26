import { Inject, Injectable, PLATFORM_ID, signal, TransferState } from '@angular/core';
import { AuthToken } from '../interfaces/auth-token';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AUTH_TOKEN_KEY } from '../components/tokens/auth-token-key';
import { JWT } from '../utils/jwt.util';
import { AuthUser } from '../interfaces/auth-user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = signal<AuthToken | null>(null);
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authToken.set(this.getStorageAuthToken);
    }
  }

  set setAuthToken(auth: AuthToken) {
    this.authToken.set(auth);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(auth));
    }
    
  }


  private get getStorageAuthToken(): AuthToken | null {
    try {
      const store: AuthToken = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY) as string);
      return store;
    } catch (e) {
      return null;
    }
  }

  check(): boolean {
    return Boolean(this.authToken());
  }

  user(): AuthUser | null {
    if (this.check()) {
      const user = JWT.decode<AuthUser>(this.authToken()?.accessToken as string);
      return user;
    }
    return null;
  } 


  get token() {
    return this.authToken();
  }
}
