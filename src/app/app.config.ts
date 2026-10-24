import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    //provider une façon d'injecter les dépendances dans l'application.
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};


