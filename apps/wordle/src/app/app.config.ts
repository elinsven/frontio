import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { guessReducer } from './store/reducers/guess.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { WordsEffects } from './store/effects/words.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ guess: guessReducer }),
    provideEffects([WordsEffects]),
    provideStoreDevtools()
  ],
};
