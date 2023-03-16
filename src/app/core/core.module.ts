import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { ErrorInterceptor } from './interceptors';
import { JwtInterceptor } from './interceptors';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { LocationService } from './services';
import { ResponsiveService } from './services';
import { SessionService } from './services';
import { GlobalInjector } from './injectors/global.injector';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LocalStorageService,
    LocationService,
    SessionService,
    ResponsiveService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule, injector: Injector) {
    if (core) {
      throw new Error(
        'You should import the core module only in the root module'
      );
    }

    GlobalInjector.injector = injector;
  }
}
