import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { LoaderService } from './commons/services/loader.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoginPresenter } from './pages/login/login.presenter';
import { loaderInterceptor } from './commons/interceptors/loader.interceptor';
import { authInterceptor } from './commons/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loaderInterceptor,
        authInterceptor
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
  ]
};
