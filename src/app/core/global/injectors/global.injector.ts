import { Injector } from '@angular/core';

export class GlobalInjector {
  private static pInjector: Injector;

  static set injector(injector: Injector) {
    this.pInjector = injector;
  }

  static get injector(): Injector {
    return this.pInjector;
  }
}
