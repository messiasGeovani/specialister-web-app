import { Component, OnInit } from '@angular/core';
import { ColorUtils } from 'src/app/shared/helpers';
import { BaseIconComponent } from './base-icon.component';

@Component({
  template: '',
})
export abstract class BaseAnimatedIconComponent
  extends BaseIconComponent
  implements OnInit
{
  secondaryColor: string;

  ngOnInit(): void {
    if (!this.color) {
      return;
    }

    const colorPallete = ColorUtils.generateColorPallete(this.color);

    if (!colorPallete) {
      return;
    }

    this.secondaryColor = colorPallete.secondary;
  }
}
