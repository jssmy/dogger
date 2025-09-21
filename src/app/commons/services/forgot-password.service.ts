import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
export class ForgotPasswordService {
  // private readonly apiUrl = `${environment.apiUrl}/auth/forgot-password`;

  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string): Observable<ForgotPasswordResponse> {
    const request: ForgotPasswordRequest = { email };
    
    // TODO: Replace with actual API call
    // return this.http.post<ForgotPasswordResponse>(this.apiUrl, request);
    
    // Simulate API call for demo
    return new Observable(observer => {
      setTimeout(() => {
        // Simulate different responses based on email
        if (email === 'test@example.com') {
          observer.next({
            message: 'Se ha enviado un correo para cambiar la contraseña',
            success: true
          });
        } else {
          observer.error({
            status: 404,
            error: {
              message: 'Usuario no encontrado'
            }
          });
        }
        observer.complete();
      }, 1000);
    });
  }
}
