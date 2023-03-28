import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { GlobalModule } from './global/global.module';
import { HttpModule } from './http/http.module';
import { SessionModule } from './session/session.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GlobalModule, HttpModule, SessionModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error(
        'You should import the core module only in the root module'
      );
    }
  }
}
