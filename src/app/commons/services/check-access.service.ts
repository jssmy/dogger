import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckAccessService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  hasAccessPage() {
  return this.http.post(`${environment.checkAccessPage}`, null, { headers: this.getHeaders() });
  }

  hasValidAuth() {
    return this.http.post(`${environment.checkAuth}`, null, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    const path = this.router.getCurrentNavigation()?.finalUrl?.toString();
    return (new HttpHeaders())
      .set('path', path as string);
  }

}
