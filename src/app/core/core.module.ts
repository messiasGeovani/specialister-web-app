import { CommonModule } from '@angular/common';
import { Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { GlobalInjector } from './injectors/global.injector';
import { HttpModule } from './modules/http/http.module';
import { SessionModule } from './modules/session/session.module';
import { LocationService, ResponsiveService } from './services';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpModule, SessionModule],
  providers: [LocalStorageService, LocationService, ResponsiveService],
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
