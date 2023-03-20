import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  constructor() {}

  isDesktop(): boolean {
    const { isSmall, isXSmall, isMedium } = this;

    const isMobileOrTablet = isSmall || isXSmall;

    if (isMobileOrTablet && !isMedium) {
      return false;
    }

    return true;
  }

  isTablet(): boolean {
    const { isSmall, isXSmall, isMedium } = this;

    if (!isXSmall && !isMedium && isSmall) {
      return true;
    }

    return false;
  }

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
