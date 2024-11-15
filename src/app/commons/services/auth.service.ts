import { Inject, Injectable, PLATFORM_ID, signal, TransferState } from '@angular/core';
import { AuthToken } from '../interfaces/auth-token';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AUTH_TOKEN_KEY } from '../components/tokens/auth-token-key';
import { User } from '../interfaces/user';
import { JWT } from '../utils/jwt.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = signal<AuthToken | null>(null);
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    private transferState: TransferState
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authToken.set(this.getStorageAuthToken);
      this.transferState.set(AUTH_TOKEN_KEY, this.authToken());
    }

    if (isPlatformServer(this.platformId)) {
      console.log(this.transferState.get(AUTH_TOKEN_KEY, null));
    }
  }

  set setAuthToken(auth: AuthToken) {
    this.authToken.set(auth);
    this.transferState.set(AUTH_TOKEN_KEY, auth);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(auth));
    }
    
    
  }


  private get getStorageAuthToken(): AuthToken | null {
    try {
      const store: AuthToken = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY) as string);
      return store;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  check(): boolean {
    return Boolean(this.authToken);
  }

  user(): User | null {
    if (this.check()) {
      const user = JWT.decode<User>(this.authToken()?.accessToken as string);
      return user;
    }
    return null;
  } 
}
