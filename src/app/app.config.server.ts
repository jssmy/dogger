import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LoaderService } from './commons/services/loader.service';

const serverConfig: ApplicationConfig = {
  providers: [
    LoaderService,
    provideServerRendering(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
