import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PasswordReset } from '../interfaces/password-reset';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private readonly http = inject(HttpClient);

  resetPassword(token: string, passwordData: { password: string; confirmPassword: string }) {
    const requestBody = {
      password: passwordData.password,
      confirmPassword: passwordData.confirmPassword
    };
    
    return this.http.patch(`${environment.resetPassword}/${token}`, requestBody);
  }

  validateTokenResetPassword(token: string) {
    return this.http.get(`${environment.validateTokenResetPassword}/${token}`);
  }

  requestPasswordReset(email: string): Observable<ForgotPasswordResponse> {
    const request: ForgotPasswordRequest = { email };
    return this.http.post<ForgotPasswordResponse>(`${environment.requestResetPassword}`, request);
  }
}
