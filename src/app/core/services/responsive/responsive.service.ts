import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor() {}

  get isXSmall(): boolean {
    return window.innerWidth < 576;
  }

  get isSmall(): boolean {
    return window.innerWidth >= 576;
  }

  get isMedium(): boolean {
    return window.innerWidth >= 768;
  }

  get isLarge(): boolean {
    return window.innerWidth >= 992;
  }

  get isExtraLarge(): boolean {
    return window.innerWidth >= 1200;
  }

  get isExtraExtraLarge(): boolean {
    return window.innerWidth >= 1400;
  }
}
