import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInjector } from './injectors/global.injector';
import { LocalStorageService, ResponsiveService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LocalStorageService, ResponsiveService],
})
export class GlobalModule {
  constructor(injector: Injector) {
    GlobalInjector.injector = injector;
  }
}
